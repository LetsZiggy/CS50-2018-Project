import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'
import { Store, connectTo } from 'aurelia-store'
import { pluck, distinctUntilChanged } from 'rxjs/operators'

import { HTTP } from '../http'
import { Actions } from '../actions'

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
  },
})
@inject(Router, Store, HTTP)
export class Entrance {
  constructor (Router, Store, HTTP) {
    this.router = Router
    this.store = Store
    this.http = HTTP
  }

  async bind (bindingContext, overrideContext) {
    this.store.registerAction(`resetState`, Actions.resetState)
    this.store.registerAction(`setToken`, Actions.setToken)
    this.store.registerAction(`setUsername`, Actions.setUsername)

    // Clear cookie and state
    if (this.state.username) {
      const result = await this.http.post(`/entrance/signout`, { username: this.state.username })
      this.store.dispatch(`resetState`)
    }
  }

  attached () {
    // Firefox autofocus issue
    setTimeout(() => document.getElementById(`signin-username`).focus(), 200)

    /* TEMP */
    this.setData(`signin`)
    /* TEMP */
  }

  unbind () {
    this.store.unregisterAction(`resetState`, Actions.resetState)
    this.store.unregisterAction(`setToken`, Actions.setToken)
    this.store.unregisterAction(`setUsername`, Actions.setUsername)
  }

  /* TEMP */
  setData (formID) {
    setTimeout(() => {
      if (document.getElementById(`${formID}-username`)) {
        document.getElementById(`${formID}-username`).value = `abcd`
      }

      if (document.getElementById(`${formID}-email`)) {
        document.getElementById(`${formID}-email`).value = `1@2.3`
      }

      if (document.getElementById(`${formID}-password`)) {
        document.getElementById(`${formID}-password`).value = `123abcABC;`
      }

      if (document.getElementById(`${formID}-confirm`)) {
        document.getElementById(`${formID}-confirm`).value = `123abcABC;`
      }

      this.checkSubmitButton(formID)
    }, 100)
  }
  /* TEMP */

  setCurrentTab (formID) {
    document.getElementById(formID).reset()
    setTimeout(() => document.getElementById(`${formID}-username`).focus(), 200)

    /* TEMP */
    this.setData(formID)
    /* TEMP */

    return true
  }

  // Enable submit button when no errors and empty inputs
  checkSubmitButton (formID) {
    let toDisable = false
    const form = document.getElementById(formID)
    const submit = document.getElementById(`${formID}-submit`)
    const inputs = form.getElementsByTagName(`input`)
    const errors = form.getElementsByClassName(`error`)

    Array.from(inputs).forEach((input) => {
      if (input.value.length === 0 && input.type !== `hidden`) {
        toDisable = true
      }
    })

    Array.from(errors).forEach((error) => {
      if (error.innerText) {
        toDisable = true
      }
    })

    submit.disabled = (toDisable) ? true : false
  }

  // Check username input field
  async checkUsername (formID) {
    const input = document.getElementById(`${formID}-username`)

    setTimeout(async () => {
      const error = input.previousElementSibling

      if (input.value.length !== 0 && input.value.length < 4) {
        error.innerText = `needs to have 4 characters minimum`
      }
      else if (input.value.length !== 0 && /[^a-zA-Z0-9._-]/g.test(input.value)) {
        error.innerText = `can only have these symbols: - . _`
      }
      else if (input.value.length !== 0 && input.value.length > 8) {
        error.innerText = `can only have up to 8 characters`
      }
      else if (input.value.length === 0) {
        error.innerText = `is a required field`
      }
      else if (formID === `register`) {
        // Check if username taken
        const result = await this.http.post(`/entrance/check`, { username: input.value })
        error.innerText = (result.payload === `username taken`) ? `taken` : ``
      }
      else {
        error.innerText = ``
      }

      this.checkSubmitButton(formID)
    }, 0)

    return true
  }

  // Check email input field
  checkEmail (formID) {
    const input = document.getElementById(`${formID}-email`)

    setTimeout(() => {
      const error = input.previousElementSibling

      if (input.value.length !== 0 && !/^[^@]+@[^@]+\.[^@]+$/.test(input.value)) {
        error.innerText = `needs to be a valid email address`
      }
      else if (input.value.length === 0) {
        error.innerText = `is a required field`
      }
      else {
        error.innerText = ``
      }

      this.checkSubmitButton(formID)
    }, 0)

    return true
  }

  // Check password input field
  checkPassword (formID) {
    const input = document.getElementById(`${formID}-password`)

    setTimeout(() => {
      const error = input.previousElementSibling

      if (input.value.length !== 0 && input.value.length < 8) {
        error.innerText = `needs to have 8 characters minimum`
      }
      else if (input.value.length !== 0 && !/^(?=.*[A-Z])/.test(input.value)) {
        error.innerText = `needs to have at least one uppercase letter`
      }
      else if (input.value.length !== 0 && !/^(?=.*[a-z])/.test(input.value)) {
        error.innerText = `needs to have at least one lowercase letter`
      }
      else if (input.value.length !== 0 && !/^(?=.*[0-9])/.test(input.value)) {
        error.innerText = `needs to have at least one number`
      }
      else if (input.value.length !== 0 && !/^(?=.*[!@#\$%\^&\*;])/.test(input.value)) {
        error.innerText = `needs to have at least one of these symbols: ! @ # $ % ^ & * ;`
      }
      else if (input.value.length === 0) {
        error.innerText = `is a required field`
      }
      else {
        error.innerText = ``

        if (formID !== `signin`) {
          this.checkConfirm(null, formID)
        }
      }

      this.checkSubmitButton(formID)
    }, 0)

    return true
  }

  // Check password confirmation input field
  checkConfirm (formID) {
    const input = document.getElementById(`${formID}-confirm`)
    const compare = document.getElementById(`${formID}-password`)

    setTimeout(() => {
      const error = input.previousElementSibling

      if (input.value.length !== 0 && input.value !== compare.value) {
        error.innerText = `needs to match password`
      }
      else if (input.value.length === 0) {
        error.innerText = `is a required field`
      }
      else {
        error.innerText = ``
      }

      this.checkSubmitButton(formID)
    }, 0)

    return true
  }

  // Submit form through fetch api
  async submitForm (event, formID, action) {
    event.preventDefault()

    const form = document.getElementById(formID)
    const data = {}

    Array.from(form.elements).forEach((element) => {
      if (element.tagName !== `FIELDSET` && element.getAttribute(`type`) !== `submit`) {
        data[element.getAttribute(`name`)] = element.value
      }
    })

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(action, { ...data, token: this.state.token })

    if (result.success) {
      this.store.dispatch(
        `setUsername`,
        {
          username: data.username,
        }
      )

      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute('lobby', { username: data.username })
      return true
    }

    let errorMessage = null

    if (result.payload === `wrong credentials`) {
      errorMessage = `<span>Wrong credentials sent</span><br/><span>Please enter the correct username and password</span>`
    }
    else if (result.payload === `username taken`) {
      errorMessage = `<span>Username you chose already taken</span><br/><span>Please enter the another username</span>`
    }
    else {
      errorMessage = `<span>We are having a server issue</span><br/><span>Please try again later</span>`
    }

    document.getElementById(`server-error`).innerHTML = errorMessage
    document.getElementById(`server-error`).classList.remove(`hidden`)

    setTimeout(() => {
      if (document.getElementById(`server-error`)) {
        document.getElementById(`server-error`).classList.add(`hidden`)
      }
    }, 2500)

    return false
  }
}
