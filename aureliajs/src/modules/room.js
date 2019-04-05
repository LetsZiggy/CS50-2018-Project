import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'
import { Store, connectTo } from 'aurelia-store'
import { pluck, distinctUntilChanged } from 'rxjs/operators'

import { HTTP } from '../http'
import { WS } from '../ws'
import { Actions } from '../actions'
import { deepAssign, calculateDie } from './form-functions'
import { roomDefault } from './room-form'

// https://rxjs-dev.firebaseapp.com/api/operators/pluck
// https://www.learnrxjs.io/operators/transformation/pluck.html
@connectTo({
  setup: `activate`,
  teardown: `deactivate`,
  target: `state`,
  selector: {
    token: (store) => store.state.pipe(
      pluck(`present`, `token`),
      distinctUntilChanged()
    ),
    username: (store) => store.state.pipe(
      pluck(`present`, `username`),
      distinctUntilChanged()
    ),
    roomsList: (store) => store.state.pipe(
      pluck(`present`, `lobby`, `roomsList`),
      distinctUntilChanged()
    ),
    room: (store) => store.state.pipe(
      pluck(`present`, `room`),
      distinctUntilChanged()
    ),
  },
})
@inject(Router, Store, HTTP, WS)
export class Room {
  constructor (Router, Store, HTTP, WS) {
    this.router = Router
    this.store = Store
    this.http = HTTP
    this.ws = WS
    this.storage = {
      websocket: null,
      prevVal: null,
      lastFocus: null,
      cursorPosition: null,
      error: null,
      showModal: false,
      macros: [],
      room: {
        message: ``,
      },
    }
  }

  // propertyChanged (stateName, newState, oldState) {
  //   switch (stateName) {
  //     case `room`:
  //       this.storage[`room`] = newState
  //       break
  //   }
  // }

  // Check if cookies still valid
  canActivate (params, routeConfig, navigationInstruction) {
    const username = document.cookie.split(`;`)
      .reduce((acc, value) => (value.includes(`username=`))
        ? value.split(`=`)[1]
        : acc, ``)

    const assettype = document.cookie.split(`;`)
      .reduce((acc, value) => (value.includes(`assettype=`))
        ? value.split(`=`)[1]
        : acc, ``)

    const assetid = document.cookie.split(`;`)
      .reduce((acc, value) => (value.includes(`assetid=`))
        ? value.split(`=`)[1]
        : acc, ``)

    if (username === `` || assetid === `` || params.assetid !== assetid || assettype !== `room`) {
      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`lobby`, { username: username })
    }

    this.storage[`username`] = username
    this.storage[`params`] = params
  }

  async bind (bindingContext, overrideContext) {
    this.store.registerAction(`setToken`, Actions.setToken)
    this.store.registerAction(`setUsername`, Actions.setUsername)
    this.store.registerAction(`appendRoomsList`, Actions.appendRoomsList)
    this.store.registerAction(`setRoomData`, Actions.setRoomData)
    this.store.registerAction(`updateRoomsListData`, Actions.updateRoomsListData)
    this.store.registerAction(`updateRoomData`, Actions.updateRoomData)
    this.store.registerAction(`updateRoomUsers`, Actions.updateRoomUsers)
    this.store.registerAction(`updateRoomsListUsers`, Actions.updateRoomsListUsers)
    this.store.registerAction(`updateRoomMacros`, Actions.updateRoomMacros)
    this.store.registerAction(`updateRoomMessages`, Actions.updateRoomMessages)
    this.store.registerAction(`commitMessage`, Actions.commitMessage)

    // Add username to state if enter room directly with valid cookies
    if (!this.state.username) {
      this.store.dispatch(
        `setUsername`,
        {
          username: this.storage.username,
        }
      )
    }

    // Get room data
    await this.getData()

    // Get index of room
    const room = this.state.roomsList
      .map((value, index) => ({ id: value.id, index: index }))
      .filter((value) => value.id === Number(this.storage.params.assetid))

    const index = (room.length) ? room[0].index : null

    if (index === null) {
      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`lobby`, { username: this.storage.username })
    }

    await this.store.dispatch(
      `setRoomData`,
      {
        default: roomDefault,
        index: index,
      }
    )

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const macros = await this.http.post(
      `/room/getRoomMacros`,
      {
        token: this.state.token,
        assetid: this.state.room.id,
        owner: this.state.username,
      }
    )

    if (macros.success && macros.payload.macros.length) {
      await this.store.dispatch(
        `updateRoomMacros`,
        {
          macros: macros.payload.macros,
        }
      )

      setTimeout(() => {
        this.storage.macros = this.prepareMacros()
      }, 0)
    }

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const messages = await this.http.post(
      `/room/getRoomMessages`,
      {
        token: this.state.token,
        assetid: this.state.room.id,
      }
    )

    if (messages.success && messages.payload.messages.length) {
      await this.store.dispatch(
        `updateRoomMessages`,
        {
          messages: messages.payload.messages,
        }
      )

      setTimeout(() => {
        if (document.getElementsByClassName(`message`).length) {
          const messages = document.getElementsByClassName(`message`)
          messages[messages.length - 1].scrollIntoView()
        }
      }, 0)
    }

    // Set websocket
    this.setWebsocket()
  }

  async attached () {
    // Ready page
    setTimeout(async () => {
      this.storage.lastFocus = document.getElementById(`message-input`)
      this.storage.prevVal = document.getElementById(`message-input`).value
    }, 50)
  }

  unbind () {
    if (this.storage.websocket && this.storage.websocket.readyState === 1) {
      this.storage.websocket.send(
        JSON.stringify({
          type: `roomExit`,
          payload: {},
        })
      )
    }

    this.store.unregisterAction(`setToken`, Actions.setToken)
    this.store.unregisterAction(`setUsername`, Actions.setUsername)
    this.store.unregisterAction(`appendRoomsList`, Actions.appendRoomsList)
    this.store.unregisterAction(`setRoomData`, Actions.setRoomData)
    this.store.unregisterAction(`updateRoomsListData`, Actions.updateRoomsListData)
    this.store.unregisterAction(`updateRoomData`, Actions.updateRoomData)
    this.store.unregisterAction(`updateRoomUsers`, Actions.updateRoomUsers)
    this.store.unregisterAction(`updateRoomsListUsers`, Actions.updateRoomsListUsers)
    this.store.unregisterAction(`updateRoomMacros`, Actions.updateRoomMacros)
    this.store.unregisterAction(`updateRoomMessages`, Actions.updateRoomMessages)
    this.store.unregisterAction(`commitMessage`, Actions.commitMessage)
  }

  // Get roomData
  async getData () {
    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/room/getOne`,
      {
        token: this.state.token,
        assetid: Number(this.storage.params.assetid),
      }
    )

    if (result.success) {
      await this.store.dispatch(
        `appendRoomsList`,
        {
          roomsList: result.payload.roomsList,
        }
      )
    }
    else {
      console.log(`server-error: roomData`)

      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`lobby`, { username: this.storage.username })
    }
  }

  showModal () {
    this.storage.showModal = !this.storage.showModal

    if (this.storage.showModal) {
      setTimeout(() => document.getElementById(`input-title`).focus(), 200)
    }

    return true
  }

  // Split this.state.room.macros into array of 3 for div.row.triple(repeat.for)
  prepareMacros () {
    let length = this.state.room.macros.length
    let result = [[]]
    let current = null
    let resultIndex = 0
    let stateIndex = 0

    while (length !== 0) {
      if (result[resultIndex].length === 3) {
        result.push([])
        resultIndex++
      }

      current = { ...this.state.room.macros[stateIndex] }
      current.titl = (current.title.length)
        ? current.title
          .split(`::titl-start::`)[1]
          .split(`::titl-end::`)[0]
          .replace(/\n/g, ``)
        : ``
      current.desc = (current.description.length)
        ? current.description
          .replace(/^\n+|\n+$/g, ``)
          .split(`::desc-start::`)[1]
          .split(`::desc-end::`)[0]
          .replace(/^\n+|\n+$/g, ``)
          .split(`\n`)
        : []
      current.calc = (current.calculation.length)
        ? current.calculation
          .split(`::calc-start::`)[1]
          .split(`::calc-end::`)[0]
          .replace(/\n/g, ``)
        : ``

      result[resultIndex].push(current)
      stateIndex++
      length--
    }

    return result
  }

  async deleteMacro (macro) {
    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/room/removeRoomMacros`,
      {
        token: this.state.token,
        id: macro.id,
      }
    )

    if (result.success) {
      await this.store.dispatch(
        `updateRoomMacros`,
        {
          isCreate: false,
          macro: macro,
        }
      )

      this.storage.macros = this.prepareMacros()
    }
    else {
      console.log(`server-error: macroData`)
    }
  }

  // Connect to websocket server
  setWebsocket () {
    if (!this.storage.websocket || this.storage.websocket.readyState === 3) {
      this.storage.websocket = new WebSocket(`ws://localhost:3000`)
      // this.storage.websocket = new WebSocket(`wss://localhost:3000`)

      this.storage.websocket.onopen = (event) => {
        this.storage.websocket.send(
          JSON.stringify({
            type: `roomEnter`,
            payload: {
              username: this.state.username,
              room: this.state.room.id,
            },
          })
        )

        console.log('ws:opened')
      }

      this.storage.websocket.onclose = (event) => {
        this.storage.websocket = null
        console.log('ws:closed')
      }

      this.storage.websocket.onerror = (event) => {
        this.storage.websocket = null
        console.log('ws:errored')
      }

      this.storage.websocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.ws.parseWebsocket(data, this.state)
      }
    }
  }

  setCurrentTab (id) {
    if (id === `owner-macros`) {
      this.storage.lastFocus = document.getElementById(`message-input`)
      this.storage.prevVal = document.getElementById(`message-input`).value
      this.storage.room = { ...this.storage.room }
    }
    else if (id === `owner-room`) {
      this.storage.room[`name`] = this.state.room.name
      this.storage.room[`passcode`] = this.state.room.passcode
      this.storage.room[`maxUsers`] = Number(this.state.room.maxUsers)
      this.storage.room[`visible`] = this.state.room.visible

      setTimeout(() => {
        document.getElementById(`room-name-input`).focus()
      }, 0)
    }
    else if (id === `user-macros`) {
      this.storage.lastFocus = document.getElementById(`message-input`)
      this.storage.prevVal = document.getElementById(`message-input`).value
      this.storage.room = { ...this.storage.room }
    }

    return true
  }

  storeCurrentValue (id) {
    this.storage.prevVal = document.getElementById(id).value
    return true
  }

  // Store last textarea in focus
  async blurTextarea (data) {
    this.storage.lastFocus = document.getElementById(data.id)

    if (data.hasOwnProperty(`next`)) {
      this[data.next](data)
    }

    return true
  }

  // Ensure input(type="text") changes are valid
  async checkText (data) {
    setTimeout(async () => {
      const elem = document.getElementById(data.id)
      const error = elem.previousElementSibling.children[1]

      if (elem.value && /[^a-zA-Z0-9 ]/g.test(elem.value)) {
        elem.value = this.storage.prevVal
        clearTimeout(this.storage.error)
        this.storage.error = null
        error.classList.remove(`hidden`)

        this.storage.error = setTimeout(() => {
          if (error) {
            error.classList.add(`hidden`)
          }
        }, 2500)
      }
      else {
        this.storage.prevVal = elem.value
        await this.updateState(data)
      }
    }, 0)

    return true
  }

  // Ensure input(type="number") changes are valid
  async checkNumber (data) {
    setTimeout(async () => {
      const elem = document.getElementById(data.id)

      if (elem.value) {
        if (elem.getAttribute(`min`) && elem.value < Number(elem.getAttribute(`min`))) {
          elem.value = Number(elem.getAttribute(`min`))
        }
        else if (elem.getAttribute(`max`) && elem.value > Number(elem.getAttribute(`max`))) {
          elem.value = Number(elem.getAttribute(`max`))
        }

        this.storage.prevVal = elem.value
        await this.updateState(data)
      }
      else {
        elem.value = this.storage.prevVal
      }
    }, 0)

    return true
  }

  // Ensure textarea changes are valid
  async checkTextarea (data) {
    setTimeout(async () => {
      const elem = document.getElementById(data.id)
      const errorElem = (data.hasOwnProperty(`error`))
        ? document.getElementById(data.error)
        : null

      this.storage.cursorPosition = elem.selectionStart

      if (!elem.value.includes(`;`)) {
        this.storage.prevVal = elem.value
        await this.updateState(data)
      }
      else {
        elem.value = this.storage.prevVal
        elem.selectionStart = elem.selectionEnd = this.storage.cursorPosition - 1

        if (data.hasOwnProperty(`error`)) {
          clearTimeout(this.storage.error)
          this.storage.error = null
          errorElem.classList.remove(`hidden`)

          this.storage.error = setTimeout(() => {
            if (errorElem) {
              errorElem.classList.add(`hidden`)
            }
          }, 2500)
        }
      }

      if (data.id === `message-input`) {
        const button = document.getElementById(`message-send`)

        if (elem.value.length) {
          button.disabled = false
        }
        else {
          button.disabled = true
        }
      }
    }, 0)

    return true
  }

  // Insert text into last textarea in focus
  // https://www.everythingfrontend.com/posts/insert-text-into-textarea-at-cursor-position.html
  insertText (id) {
    this.storage.lastFocus = document.getElementById(id)
    const text = `::calc-start::\n\n::calc-end::`
    this.storage.lastFocus.value = ``
    this.storage.lastFocus.focus()
    const isSuccess = document.execCommand(`insertText`, false, text)

    // Firefox (non-standard method)
    if (!isSuccess && typeof this.storage.lastFocus.setRangeText === `function`) {
      const start = this.storage.lastFocus.selectionStart
      this.storage.lastFocus.setRangeText(text)

      // Update cursor to be at the end of insertion
      this.storage.lastFocus.selectionStart = this.storage.lastFocus.selectionEnd = start + 15

      // Notify any possible listeners of the change
      const e = document.createEvent(`UIEvent`)
      e.initEvent(`input`, true, false)
      this.storage.lastFocus.dispatchEvent(e)
    }

    return true
  }

  async updateState (data) {
    if (!data.hasOwnProperty(`initialise`)) {
      // Split keys to arrays
      data.keys = data.keys.split(`.`).slice(2)

      // Set data value for this.store.dispatch
      switch (data.type) {
        case `input-text`:
        case `textarea-text`:
          data.value = document.getElementById(data.id).value
          break

        case `input-number`:
          data.value = Number(document.getElementById(data.id).value)
          break

        case `checkbox-boolean`:
          data.value = document.getElementById(data.id).checked
          break
      }

      // Get object with new values
      let main = deepAssign(data.keys, data.value)

      if (!data.hasOwnProperty(`localStorage`) || !data.localStorage) {
        await this.store.dispatch(
          `setRoomData`,
          {
            value: main,
          }
        )
      }
      else {
        this.storage.room[data.keys[0]] = main[data.keys[0]]
      }
    }

    return true
  }

  async messageCalculation (data) {
    const regexDice = /\[(\+|-)?(\d+)?d(\d+)\]/g
    const regexModifiers = /\[(\+|-)?(\d+)\]/g

    const dice = {
      d100: { positive: 0, negative: 0, rolls: [], total: 0 },
      d20: { positive: 0, negative: 0, rolls: [], total: 0 },
      d12: { positive: 0, negative: 0, rolls: [], total: 0 },
      d10: { positive: 0, negative: 0, rolls: [], total: 0 },
      d8: { positive: 0, negative: 0, rolls: [], total: 0 },
      d6: { positive: 0, negative: 0, rolls: [], total: 0 },
      d4: { positive: 0, negative: 0, rolls: [], total: 0 },
    }

    const modifiers = {
      absolutes: [],
    }

    let die = null
    let modifier = null
    let totalAmount = 0
    let result = ``

    const calculate = data.text
      .split(`::calc-start::`)[1]
      .split(`::calc-end::`)[0]
      .replace(/\n/g, ``)

    // Get dice roll count
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Examples
    while ((die = regexDice.exec(calculate)) !== null) {
      if (typeof die[2] === `undefined`) {
        die[2] = 1
      }

      if (die[1] && die[1] === `-`) {
        dice[`d${die[3]}`].negative = dice[`d${die[3]}`].negative + Number(die[2])
      }
      else {
        dice[`d${die[3]}`].positive = dice[`d${die[3]}`].positive + Number(die[2])
      }
    }

    // Get absolute modifiers
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Examples
    while ((modifier = regexModifiers.exec(calculate)) !== null) {
      if (modifier[1] && modifier[1] === `-`) {
        modifiers.absolutes.push([`[-${modifier[2]}]`, (0 - Number(modifier[2]))])
        totalAmount -= Number(modifier[2])
      }
      else {
        modifiers.absolutes.push([`[+${modifier[2]}]`, Number(modifier[2])])
        totalAmount += Number(modifier[2])
      }
    }

    // Roll dice
    Object.keys(dice).forEach((key) => {
      const dieType = Number(key.slice(1))
      let roll = 0

      if (dice[key].positive > 0) {
        for (let i = dice[key].positive; i > 0; i--) {
          roll = calculateDie(dieType)
          dice[key].rolls.push(`+${roll}`)
          dice[key].total += roll
        }
      }

      if (dice[key].negative > 0) {
        for (let i = dice[key].negative; i > 0; i--) {
          roll = calculateDie(dieType)
          dice[key].rolls.push(`-${roll}`)
          dice[key].total -= roll
        }
      }

      totalAmount += dice[key].total
    })

    // Generate dice message
    Object.keys(dice).forEach((key) => {
      if (dice[key].positive > 0) {
        result = (!result.length)
          ? `+${dice[key].total} [+${dice[key].positive}${key}]`
          : `${result} +${dice[key].total} [+${dice[key].positive}${key}]`
      }

      if (dice[key].negative > 0) {
        result = (!result.length)
          ? `${dice[key].total} [-${dice[key].negative}${key}]`
          : `${result} ${dice[key].total} [-${dice[key].negative}${key}]`
      }
    })

    // Generate absolute modifiers message
    modifiers.absolutes.forEach((value) => {
      result = (!result.length)
        ? `${value[0]}`
        : `${result} ${value[0]}`
    })

    // Generate total amount message
    result = (!result.length)
      ? `No valid calculations`
      : `${result} = ${totalAmount}`

    // Get text before ::calc-start::
    const before = data.text
      .split(`::calc-start::`)[0]
      // .replace(/\n/g, ``)

    // Get text after ::calc-end::
    const after = data.text
      .split(`::calc-end::`)[1]
      // .replace(/\n/g, ``)

    result = `${before}\n${result}\n${after}`

    return result
  }

  async commitMessage (data) {
    let textarea = null
    let button = null
    let text = ``

    if (data.isMacro) {
      text = `${data.macro.title}${data.macro.description}${data.macro.calculation}`
    }
    else {
      textarea = document.getElementById(data.textarea)
      button = document.getElementById(data.button)
      text = textarea.value
    }

    if (text.includes(`::titl-start::`) && text.includes(`::titl-end::`)) {
      data.title = text
        .split(`::titl-start::`)[1]
        .split(`::titl-end::`)[0]
        .replace(/\n/g, ``)

      // Get text before ::titl-start::
      const before = text
        .split(`::titl-start::`)[0]
        // .replace(/\n/g, ``)

      // Get text after ::titl-end::
      const after = text
        .split(`::titl-end::`)[1]
        // .replace(/\n/g, ``)

      text = `${before}\n${after}`
    }

    if (text.includes(`::desc-start::`) && text.includes(`::desc-end::`)) {
      const desc = text
        .split(`::desc-start::`)[1]
        .split(`::desc-end::`)[0]
        // .replace(/\n/g, ``)

      // Get text before ::desc-start::
      const before = text
        .split(`::desc-start::`)[0]
        // .replace(/\n/g, ``)

      // Get text after ::desc-end::
      const after = text
        .split(`::desc-end::`)[1]
        // .replace(/\n/g, ``)

      text = `${before}\n${desc}\n${after}`
    }

    if (text.includes(`::calc-start::`) && text.includes(`::calc-end::`)) {
      text = await this.messageCalculation({ text: text })
    }

    text = text
      .split(`\n`)
      .reduce((acc, value) => {
        if (value.length) {
          acc.push(value)
        }

        return acc
      }, [])

    if (text.length) {
      await this.store.dispatch(`setToken`, await this.http.get(`/token`))
      const result = await this.http.post(
        `/room/commitMessage`,
        {
          token: this.state.token,
          assetid: this.state.room.id,
          owner: this.state.username,
          utc: Date.now(),
          title: (data.title) ? data.title : ``,
          text: JSON.stringify(text),
          websocketType: `commitMessage`,
        }
      )

      if (result.success) {
        await this.store.dispatch(
          `commitMessage`,
          {
            room: this.state.room.id,
            owner: this.state.username,
            utc: Date.now(),
            title: (data.title) ? data.title : ``,
            text: text,
          }
        )

        setTimeout(() => {
          if (document.getElementsByClassName(`message`).length) {
            const messages = document.getElementsByClassName(`message`)
            messages[messages.length - 1].scrollIntoView()
          }
        }, 0)
      }
      else {
        console.log(`server-error: commitMessage`)
        document.getElementById(`form-error`).classList.remove(`hidden`)

        setTimeout(() => {
          if (document.getElementById(`form-error`)) {
            document.getElementById(`form-error`).classList.add(`hidden`)
          }
        }, 2500)
      }
    }

    if (textarea !== null && button !== null) {
      textarea.value = ``
      button.disabled = true
    }

    return true
  }

  async updateRoomData () {
    const settings = {
      name: this.storage.room.name,
      passcode: this.storage.room.passcode,
      maxUsers: this.storage.room.maxUsers,
      visible: this.storage.room.visible,
    }

    // Convert string to integer
    this.storage.room.maxUsers = Number(this.storage.room.maxUsers)
    settings.maxUsers = Number(settings.maxUsers)

    // Convert boolean to integer
    settings.visible = (settings.visible === true)
      ? 1
      : 0

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/room/updateRoomData`,
      {
        token: this.state.token,
        assetid: this.state.room.id,
        owner: this.state.username,
        name: settings.name,
        passcode: settings.passcode,
        maxUsers: Number(settings.maxUsers),
        visible: settings.visible,
        websocketType: `roomUpdate`,
      }
    )

    if (result.success) {
      const { index } = this.state.roomsList
        .map((value, index) => ({ id: value.id, index: index }))
        .filter((value) => value.id === this.state.room.id)[0]

      await this.store.dispatch(
        `updateRoomsListData`,
        {
          index: index,
          name: this.storage.room.name,
          passcode: this.storage.room.passcode,
          maxUsers: Number(this.storage.room.maxUsers),
          visible: this.storage.room.visible,
        }
      )

      await this.store.dispatch(
        `updateRoomData`,
        {
          name: this.storage.room.name,
          passcode: this.storage.room.passcode,
          maxUsers: Number(this.storage.room.maxUsers),
          visible: this.storage.room.visible,
        }
      )

      document.getElementById(`owner-room`).children[0].children[0].click()
    }
    else {
      console.log(`server-error: roomUpdate`)
      document.getElementById(`form-error`).classList.remove(`hidden`)

      setTimeout(() => {
        if (document.getElementById(`form-error`)) {
          document.getElementById(`form-error`).classList.add(`hidden`)
        }
      }, 2500)
    }
    return false
  }

  enableButton (id) {
    const select = document.getElementById(id)
    const button = select.nextElementSibling

    button.disabled = (select.selectedIndex === 0)
      ? true
      : false

    return true
  }

  async roomAddRemoveUsers (data) {
    const select = document.getElementById(data.elemID)
    let filter = null
    let index = (data.elemID !== `user-self-resign`)
      ? Number(select[select.selectedIndex].value)
      : select[select.selectedIndex].value

    data.id = this.state.room.id
    data.index = this.state.roomsList
      .map((value) => value.id)
      .indexOf(data.id)

    if (data.elemID === `user-self-resign`) {
      index = this.state.room.users.indexOf(index)
    }

    filter = this.state.room.users[index]
    data.users = this.state.room.users
      .filter((value) => value !== filter)

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/room/updateRoomUsers`,
      {
        token: this.state.token,
        assetid: data.id,
        user: this.state.room.users[index],
        users: data.users.join(`;`),
        websocketType: `userRemove`,
      }
    )

    if (result.success) {
      this.store.dispatch(
        `updateRoomsListUsers`,
        {
          index: data.index,
          users: [...data.users],
        }
      )

      this.store.dispatch(
        `updateRoomUsers`,
        {
          users: [...data.users],
        }
      )

      if (data.elemID === `user-self-resign`) {
        this.router.navigateToRoute(`lobby`, { username: this.storage.username })
      }
    }

    if (select && select.selectedIndex > 0) {
      select.selectedIndex = 0
      this.enableButton(data.elemID)
    }

    return true
  }
}
