import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'
import { Store, connectTo } from 'aurelia-store'
import { pluck, distinctUntilChanged } from 'rxjs/operators'

import { HTTP } from '../http'
import { Actions } from '../actions'
import { deepGet, deepAssign, calculateDependants } from './form-functions'
import { characterForm, characterDefault, characterBooleanKeys, characterArrayKeys, characterJSONKeys } from './character-form'

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
    charactersList: (store) => store.state.pipe(
      pluck(`present`, `lobby`, `charactersList`),
      distinctUntilChanged()
    ),
    character: (store) => store.state.pipe(
      pluck(`present`, `character`),
      distinctUntilChanged()
    ),
  },
})
@inject(Router, Store, HTTP)
export class Character {
  radioMatcher = (fromMV, fromV) => fromMV.includes(fromV)

  constructor (Router, Store, HTTP) {
    this.router = Router
    this.store = Store
    this.http = HTTP
    this.form = { ...characterForm }
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
  //     case `character`:
  //       this.storage[`character`] = newState
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

    if (username === `` || assetid === `` || params.assetid !== assetid || assettype !== `character`) {
      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`lobby`, { username: username })
    }

    this.storage[`username`] = username
    this.storage[`params`] = params
  }

  async bind (bindingContext, overrideContext) {
    this.store.registerAction(`setToken`, Actions.setToken)
    this.store.registerAction(`setUsername`, Actions.setUsername)
    this.store.registerAction(`appendCharactersList`, Actions.appendCharactersList)
    this.store.registerAction(`setCharacterData`, Actions.setCharacterData)
    this.store.registerAction(`commitCharacterChanges`, Actions.commitCharacterChanges)

    // Add username to state if enter character directly with valid cookies
    if (!this.state.username) {
      this.store.dispatch(
        `setUsername`,
        {
          username: this.storage.username,
        }
      )
    }

    // Get character data
    if (!this.state.character.id || this.state.character.id !== Number(this.storage.params.assetid)) {
      // Get charactersList if list empty
      if (!this.state.charactersList.length) {
        await this.getData()
      }

      // Get index of character
      const character = this.state.charactersList
        .map((value, index) => ({ id: value.id, index: index }))
        .filter((value) => value.id === Number(this.storage.params.assetid))

      const index = (character.length) ? character[0].index : null

      if (index === null) {
        // https://stackoverflow.com/a/36973396
        this.router.navigateToRoute(`lobby`, { username: this.storage.username })
      }

      await this.store.dispatch(
        `setCharacterData`,
        {
          default: characterDefault,
          index: index,
        }
      )

      await this.sortItems({ initialise: true })
      await this.updateState({ initialise: true })
    }
  }

  async attached () {
    // Ready page
    setTimeout(async () => {
      // document.getElementById(`name`).focus()
    }, 50)
  }

  unbind () {
    this.store.unregisterAction(`setToken`, Actions.setToken)
    this.store.unregisterAction(`setUsername`, Actions.setUsername)
    this.store.unregisterAction(`appendCharactersList`, Actions.appendCharactersList)
    this.store.unregisterAction(`setCharacterData`, Actions.setCharacterData)
    this.store.unregisterAction(`commitCharacterChanges`, Actions.commitCharacterChanges)
  }

  // Get characters
  async getData () {
    // const charactersLastID = (this.state.charactersList.length)
    //   ? this.state.charactersList.reduce((acc, value) => (Number(value.id) > acc)
    //     ? Number(value.id)
    //     : acc, 0)
    //   : 0

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/character/getAll`,
      {
        token: this.state.token,
        // charactersLastID: charactersLastID,
      }
    )

    if (result.success) {
      await this.store.dispatch(
        `appendCharactersList`,
        {
          charactersList: result.payload.charactersList,
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
      if (data.hasOwnProperty(`keys`)) {
        // Split keys to arrays
        data.keys = data.keys.split(`.`).slice(2)
      }
      else {
        data[`keys`] = null
      }

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
          data.value = deepGet(data.keys, this.state.character)

          if (data.value.includes(data.statistic)) {
            data.value = data.value.filter((value) => value !== data.statistic)
          }
          else {
            data.value.push(data.statistic)
          }

          break

        case `radio-array`:
          data.value = deepGet(data.keys, this.state.character)
          data.value = data.value
            .map((value) => value.includes(data.statistic)
              ? `${data.statistic}${data.id.split(data.statistic)[1]}`
              : value
            )

          break

        case `textarea-array`:
          data.value = deepGet(data.keys, this.state.character)
          data.value[data.index] = document.getElementById(data.id).value
          break
      }

      if (data.keys) {
        // Get object with new values
        let main = deepAssign(data.keys, data.value)

        if (!data.hasOwnProperty(`localStorage`) || !data.localStorage) {
          await this.store.dispatch(
            `setCharacterData`,
            {
              value: main,
            }
          )
        }
        else {
          this.storage.character[data.keys[0]] = main[data.keys[0]]
        }
      }
    }

    // Get object with all new dependants values
    const dependants = calculateDependants(this.state.character, this.form)

    if (!data.hasOwnProperty(`localStorage`) || !data.localStorage) {
      this.store.dispatch(
        `setCharacterData`,
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
    arr[data.statistic] = [...this.form[data.form], ...this.state.character[data.statistic]]

    await this.store.dispatch(
      `setCharacterData`,
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
    if (data.statistic === `itemList`) {
      arr[data.statistic] = [
          `::title-start::\n`
        + `TITLE PLACEHOLDER\n`
        + `::title-end::\n`
        + `\n`
        + `::description-start::\n`
        + `DESCRIPTION PLACEHOLDER\n`
        + `::description-end::\n`
        + `\n`
        + `::property-start::\n`
        + `PROPERTY PLACEHOLDER\n`
        + `::property-end::\n`,
        ...this.state.character[data.statistic],
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
        ...this.state.character[data.statistic],
      ]
    }
    else {
      arr[data.statistic] = [
        ``,
        ...this.state.character[data.statistic],
      ]
    }

    this.store.dispatch(
      `setCharacterData`,
      {
        value: arr,
      }
    )

    return false
  }

  // Remove related textarea
  async removeTextarea (data) {
    let arr = {}
    arr[data.statistic] = [...this.state.character[data.statistic]]
    arr[data.statistic].splice(data.index, 1)

    if (data.statistic === `actions` && this.storage.lastFocus !== null) {
      if (this.storage.lastFocus.getAttribute(`id`) === `action-${data.index}`) {
        this.storage.lastFocus = null
      }
    }

    await this.store.dispatch(
      `setCharacterData`,
      {
        value: arr,
      }
    )

    if (data.hasOwnProperty(`next`)) {
      data.next.forEach(async (next) => await this[next](data))
    }

    return false
  }

  // Check Items textareas for selectable items
  async sortItems (data) {
    let items = {}

    // Array format
    for (let sortFunction of this.form.sortItems) {
      let result = sortFunction(this.state.character, this.form)
      items[result[0]] = result[1]
    }

    await this.store.dispatch(
      `setCharacterData`,
      {
        value: items,
      }
    )

    await this.checkEquipped(data)
    await this.updateState(data)

    return true
  }

  // Check if equipped items still in items list
  async checkEquipped (data) {
    const equipmentWeaponList = [ ...this.state.character.equipmentWeaponList ]
      .map((value) => value[1])
      .reduce((acc, value) => [ ...acc, ...value ], [])
      .map((value) => value[0])

    const equipmentAccessoryList = [ ...this.state.character.equipmentAccessoryList ]
      .map((value) => value[1])
      .reduce((acc, value) => [ ...acc, ...value ], [])
      .map((value) => value[0])

    const equipmentArmorList = [ ...this.state.character.equipmentArmorList ]
      .map((value) => value[1])
      .reduce((acc, value) => [ ...acc, ...value ], [])
      .map((value) => value[0])

    const equipmentShieldList = [ ...this.state.character.equipmentShieldList ]
      .map((value) => value[1])
      .reduce((acc, value) => [ ...acc, ...value ], [])
      .map((value) => value[0])

    let equippedWeaponList = [ ...this.state.character.equippedWeaponList ]
    let equippedAccessoryList = [ ...this.state.character.equippedAccessoryList ]
    let equippedArmor = this.state.character.equippedArmor
    let equippedShield = this.state.character.equippedShield

    equippedWeaponList = 
      (equipmentWeaponList.length)
        ? equippedWeaponList
          .reduce((acc, value) =>
            (equipmentWeaponList.includes(value))
              ? [ ...acc, value ]
              : acc, [])
        : []

    equippedAccessoryList = 
      (equipmentAccessoryList.length)
        ? equippedAccessoryList
          .reduce((acc, value) =>
            (equipmentAccessoryList.includes(value))
              ? [ ...acc, value ]
              : acc, [])
        : []

    equippedArmor = (equipmentArmorList.includes(equippedArmor))
      ? equippedArmor
      : ``

    equippedShield = (equipmentShieldList.includes(equippedShield))
      ? equippedShield
      : ``

    await this.store.dispatch(
      `setCharacterData`,
      {
        value: {
          equippedWeaponList: [ ...equippedWeaponList ],
          equippedAccessoryList: [ ...equippedAccessoryList ],
          equippedArmor: equippedArmor,
          equippedShield: equippedShield,
        },
      }
    )

    return true
  }

  // Store last textarea in focus
  async blurTextarea (data) {
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
    const character = { ...this.state.character }

    for (let key in character) {
      // Convert Javascript object to JSON string
      const characterJSONKeysList = characterJSONKeys.map((value) => value[0])
      if (characterJSONKeysList.includes(key)) {
        character[key] = character[key].map((value) => value.replace(/\n/g, `<br />`))
      }

      // Convert boolean to integer
      if (characterBooleanKeys.includes(key)) {
        character[key] = (character[key] === true)
          ? 1
          : 0
      }

      // Join array to string
      if (characterArrayKeys.includes(key)) {
        character[key] = (character[key].length)
          ? character[key].join(`;`)
          : ``
      }
    }

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      url,
      {
        token: this.state.token,
        character: character,
        websocketType: `characterUpdate`,
      }
    )

    if (result.success) {
      const { index } = this.state.charactersList
        .map((value, index) => ({ id: value.id, index: index }))
        .filter((value) => value.id === this.state.character.id)[0]

      await this.store.dispatch(
        action,
        {
          index: index,
          value: this.state.character,
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

// https://i.imgur.com/KhLySzR.jpg
