import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'
import { Store, connectTo } from 'aurelia-store'
import { pluck, distinctUntilChanged } from 'rxjs/operators'

import { HTTP } from '../http'
import { Actions } from '../actions'
import { deepGet, deepAssign, calculateDependants } from './form-functions'
import { monsterForm, monsterDefault, monsterBooleanKeys, monsterArrayKeys, monsterJSONKeys } from './monster-form'

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
    monstersList: (store) => store.state.pipe(
      pluck(`present`, `lobby`, `monstersList`),
      distinctUntilChanged()
    ),
    monster: (store) => store.state.pipe(
      pluck(`present`, `monster`),
      distinctUntilChanged()
    ),
  },
})
@inject(Router, Store, HTTP)
export class Monster {
  radioMatcher = (fromMV, fromV) => fromMV.includes(fromV)

  constructor (Router, Store, HTTP) {
    this.router = Router
    this.store = Store
    this.http = HTTP
    this.form = { ...monsterForm }
    this.storage = {
      prevVal: null,
      lastFocus: null,
      lastStatistic: null,
      cursorPosition: null,
      error: null,
    }
  }

  // propertyChanged (stateName, newState, oldState) {
  //   switch (stateName) {
  //     case `monster`:
  //       this.storage[`monster`] = newState
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

    if (username === `` || assetid === `` || params.assetid !== assetid || assettype !== `monster`) {
      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`lobby`, { username: username })
    }

    this.storage[`username`] = username
    this.storage[`params`] = params
  }

  async bind (bindingContext, overrideContext) {
    this.store.registerAction(`setToken`, Actions.setToken)
    this.store.registerAction(`setUsername`, Actions.setUsername)
    this.store.registerAction(`appendMonstersList`, Actions.appendMonstersList)
    this.store.registerAction(`setMonsterData`, Actions.setMonsterData)
    this.store.registerAction(`commitMonsterChanges`, Actions.commitMonsterChanges)

    // Add username to state if enter monster directly with valid cookies
    if (!this.state.username) {
      this.store.dispatch(
        `setUsername`,
        {
          username: this.storage.username,
        }
      )
    }

    // Get monster data
    if (!this.state.monster.id || this.state.monster.id !== Number(this.storage.params.assetid)) {
      // Get monstersList if list empty
      if (!this.state.monstersList.length) {
        await this.getData()
      }

      // Get index of monster
      const monster = this.state.monstersList
        .map((value, index) => ({ id: value.id, index: index }))
        .filter((value) => value.id === Number(this.storage.params.assetid))

      const index = (monster.length) ? monster[0].index : null

      if (index === null) {
        // https://stackoverflow.com/a/36973396
        this.router.navigateToRoute(`lobby`, { username: this.storage.username })
      }

      await this.store.dispatch(
        `setMonsterData`,
        {
          default: monsterDefault,
          index: index,
        }
      )
    }
  }

  async attached () {
    // Ready page
    setTimeout(async () => {
      await this.updateState({ initialise: true })
      document.getElementById(`name`).focus()
    }, 50)
  }

  unbind () {
    this.store.unregisterAction(`setToken`, Actions.setToken)
    this.store.unregisterAction(`setUsername`, Actions.setUsername)
    this.store.unregisterAction(`appendMonstersList`, Actions.appendMonstersList)
    this.store.unregisterAction(`setMonsterData`, Actions.setMonsterData)
    this.store.unregisterAction(`commitMonsterChanges`, Actions.commitMonsterChanges)
  }

  // Get monsters
  async getData () {
    // const monstersLastID = (this.state.monstersList.length)
    //   ? this.state.monstersList.reduce((acc, value) => (Number(value.id) > acc)
    //     ? Number(value.id)
    //     : acc, 0)
    //   : 0

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/monster/getAll`,
      {
        token: this.state.token,
        // monstersLastID: monstersLastID,
      }
    )

    if (result.success) {
      await this.store.dispatch(
        `appendMonstersList`,
        {
          monstersList: result.payload.monstersList,
        }
      )
    }
    else {
      console.log(`server-error: getAll`)

      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`lobby`, { username: this.storage.username })
    }
  }

  storeCurrentValue (id) {
    this.storage.prevVal = document.getElementById(id).value
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
      this.storage.cursorPosition = elem.selectionStart

      if (!elem.value.includes(`;`)) {
        this.storage.prevVal = elem.value
        await this.updateState(data)
      }
      else {
        elem.value = this.storage.prevVal
        elem.selectionStart = elem.selectionEnd = this.storage.cursorPosition - 1
        clearTimeout(this.storage.error)
        this.storage.error = null
        document.getElementById(`error-${data.id}`).classList.remove(`hidden`)

        this.storage.error = setTimeout(() => {
          if (document.getElementById(`error-${data.id}`)) {
            document.getElementById(`error-${data.id}`).classList.add(`hidden`)
          }
        }, 2500)
      }
    }, 0)

    return true
  }

  // Toggle hidden class on related elements
  async showElem (data) {
    Array.from(document.getElementsByClassName(`group-${data.group}-${data.statistic}`)).forEach((value) => {
      value.classList.toggle(`hidden`)
    })

    await this.updateState(data)
    return true
  }

  async updateState (data) {
    if (!data.hasOwnProperty(`initialise`)) {
      // Split keys to arrays
      data.keys = data.keys.split(`.`).slice(2)

      // Set data value for this.store.dispatch
      switch (data.type) {
        case `input-text`:
        case `select-text`:
        case `textarea-text`:
          data.value = document.getElementById(data.id).value
          break

        case `input-number`:
        case `select-number`:
          data.value = Number(document.getElementById(data.id).value)
          break

        case `select-multiple`:
          // https://stackoverflow.com/a/39363742/7641789
          data.value = Array.from(document.getElementById(data.id).options)
            .filter((value) => value.selected)
            .map((value) => value.value)

          break

        case `checkbox-boolean`:
          data.value = document.getElementById(data.id).checked
          break

        case `checkbox-array`:
          data.value = deepGet(data.keys, this.state.monster)

          if (data.value.includes(data.statistic)) {
            data.value = data.value.filter((value) => value !== data.statistic)
          }
          else {
            data.value.push(data.statistic)
          }

          break

        case `radio-array`:
          data.value = deepGet(data.keys, this.state.monster)
          data.value = data.value
            .map((value) => value.includes(data.statistic)
              ? `${data.statistic}${data.id.split(data.statistic)[1]}`
              : value
            )

          break

        case `textarea-array`:
          data.value = deepGet(data.keys, this.state.monster)
          data.value[data.index] = document.getElementById(data.id).value
          break
      }

      // Get object with new values
      let main = deepAssign(data.keys, data.value)

      if (!data.hasOwnProperty(`localStorage`) || !data.localStorage) {
        await this.store.dispatch(
          `setMonsterData`,
          {
            value: main,
          }
        )
      }
      else {
        this.storage.monster[data.keys[0]] = main[data.keys[0]]
      }
    }

    // Get object with all new dependants values
    const dependants = calculateDependants(this.state.monster, this.form)

    if (!data.hasOwnProperty(`localStorage`) || !data.localStorage) {
      this.store.dispatch(
        `setMonsterData`,
        {
          value: dependants,
        }
      )
    }

    return true
  }

  // Add sample textarea
  async addSamples (data) {
    let arr = {}
    arr[data.statistic] = [...this.form[data.form], ...this.state.monster[data.statistic]]

    await this.store.dispatch(
      `setMonsterData`,
      {
        value: arr,
      }
    )

    if (data.hasOwnProperty(`next`)) {
      data.next.forEach(async (next) => await this[next](data))
    }

    return false
  }

  // Add related textarea
  addTextarea (data) {
    let arr = {}
    if (data.statistic === `specialTraitList`) {
      arr[data.statistic] = [
          `::title-start::\n`
        + `TITLE PLACEHOLDER\n`
        + `::title-end::\n`
        + `\n`
        + `::description-start::\n`
        + `DESCRIPTION PLACEHOLDER\n`
        + `::description-end::\n`
        + `\n`,
        ...this.state.monster[data.statistic],
      ]
    }
    else if (data.statistic === `actionList`) {
      arr[data.statistic] = [
          `::title-start::\n`
        + `TITLE PLACEHOLDER\n`
        + `::title-end::\n`
        + `\n`
        + `::description-start::\n`
        + `DESCRIPTION PLACEHOLDER\n`
        + `::description-end::\n`
        + `\n`
        + `::hit-start::\n`
        + `HIT PLACEHOLDER\n`
        + `::hit-end::\n`
        + `\n`
        + `::damage-start::\n`
        + `DAMAGE PLACEHOLDER\n`
        + `::damage-end::\n`,
        ...this.state.monster[data.statistic],
      ]
    }
    else {
      arr[data.statistic] = [
        ``,
        ...this.state.monster[data.statistic],
      ]
    }

    this.store.dispatch(
      `setMonsterData`,
      {
        value: arr,
      }
    )

    return false
  }

  // Remove related textarea
  removeTextarea (data) {
    let arr = {}
    arr[data.statistic] = [...this.state.monster[data.statistic]]
    arr[data.statistic].splice(data.index, 1)

    if (data.statistic === `actions` && this.storage.lastFocus !== null) {
      if (this.storage.lastFocus.getAttribute(`id`) === `action-${data.index}`) {
        this.storage.lastFocus = null
      }
    }

    this.store.dispatch(
      `setMonsterData`,
      {
        value: arr,
      }
    )

    if (data.hasOwnProperty(`next`)) {
      data.next.forEach(async (next) => await this[next](data))
    }

    return false
  }

  // Store last textarea in focus
  blurTextarea (data) {
    this.storage.lastFocus = document.getElementById(data.id)

    if (data.hasOwnProperty(`next`)) {
      data.next.forEach(async (next) => await this[next](data))
    }

    return true
  }

  // Insert text into last textarea in focus
  // https://www.everythingfrontend.com/posts/insert-text-into-textarea-at-cursor-position.html
  insertStatistic (id) {
    if (this.storage.lastFocus) {
      this.storage.lastFocus.focus()
      this.storage.lastStatistic = document.getElementById(id).value
      const isSuccess = document.execCommand(`insertText`, false, this.storage.lastStatistic)

      // Firefox (non-standard method)
      if (!isSuccess && typeof this.storage.lastFocus.setRangeText === `function`) {
        const start = this.storage.lastFocus.selectionStart
        this.storage.lastFocus.setRangeText(this.storage.lastStatistic)

        // Update cursor to be at the end of insertion
        this.storage.lastFocus.selectionStart = this.storage.lastFocus.selectionEnd = start + this.storage.lastStatistic.length

        // Notify any possible listeners of the change
        const e = document.createEvent(`UIEvent`)
        e.initEvent(`input`, true, false)
        this.storage.lastFocus.dispatchEvent(e)
      }

      setTimeout(() => {
        document.getElementById(id).classList.add(`added`)

        setTimeout(() => {
          document.getElementById(id).classList.remove(`added`)
        }, 500)
      }, 0)
    }
    else {
      setTimeout(() => {
        document.getElementById(id).classList.add(`not-added`)

        setTimeout(() => {
          document.getElementById(id).classList.remove(`not-added`)
        }, 500)
      }, 0)
    }

    setTimeout(() => {
      this.storage.lastStatistic = null
    }, 500)

    return true
  }

  // Save form values
  async submitForm (formID, action, url) {
    const monster = { ...this.state.monster }

    for (let key in monster) {
      // Convert Javascript object to JSON string
      const monsterJSONKeysList = monsterJSONKeys.map((value) => value[0])
      if (monsterJSONKeysList.includes(key)) {
        monster[key] = monster[key].map((value) => value.replace(/\n/g, `<br />`))
      }

      // Convert boolean to integer
      if (monsterBooleanKeys.includes(key)) {
        monster[key] = (monster[key] === true)
          ? 1
          : 0
      }

      // Join array to string
      if (monsterArrayKeys.includes(key)) {
        monster[key] = (monster[key].length)
          ? monster[key].join(`;`)
          : ``
      }
    }

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      url,
      {
        token: this.state.token,
        monster: monster,
        websocketType: `monsterUpdate`,
      }
    )

    if (result.success) {
      const { index } = this.state.monstersList
        .map((value, index) => ({ id: value.id, index: index }))
        .filter((value) => value.id === this.state.monster.id)[0]

      await this.store.dispatch(
        action,
        {
          index: index,
          value: this.state.monster,
        }
      )

      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`lobby`, { username: this.storage.username })
    }
    else {
      console.log(`server-error: update`)
      document.getElementById(`form-error`).classList.remove(`hidden`)

       setTimeout(() => {
        if (document.getElementById(`form-error`)) {
          document.getElementById(`form-error`).classList.add(`hidden`)
        }
       }, 2500)
    }

    return false
  }
}

// https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/351/1000/1000/636252777818652432.jpeg
