import { inject, bindable } from 'aurelia-framework'
import { Store, connectTo } from 'aurelia-store'
import { pluck, distinctUntilChanged } from 'rxjs/operators'

import { HTTP } from '../../http'
import { Actions } from '../../actions'

// https://rxjs-dev.firebaseapp.com/api/operators/pluck
// https://www.learnrxjs.io/operators/transformation/pluck.html
@connectTo({
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
    room: (store) => store.state.pipe(
      pluck(`present`, `room`),
      distinctUntilChanged()
    ),
  },
})
@inject(Store, HTTP)
export class MacroModal {
  @bindable showModal
  @bindable prepareMacros
  @bindable macros

  constructor (Store, HTTP) {
    this.store = Store
    this.http = HTTP
  }

  async bind (bindingContext, overrideContext) {
    this.store.registerAction(`setToken`, Actions.setToken)
    this.store.registerAction(`updateRoomMacros`, Actions.updateRoomMacros)
  }

  unbind () {
    this.store.unregisterAction(`setToken`, Actions.setToken)
    this.store.unregisterAction(`updateRoomMacros`, Actions.updateRoomMacros)
  }

  toggleModal () {
    document.getElementById(`input-title`).value = ``
    document.getElementById(`input-description`).value = ``
    document.getElementById(`input-calculation`).value = ``

    this.showModal()
  }

  checkInput () {
    setTimeout(() => {
      const titl = document.getElementById(`input-title`).value
      const desc = document.getElementById(`input-description`).value
      const calc = document.getElementById(`input-calculation`).value
      const submit = document.getElementById(`modal-submit`)

      if (titl.length && (desc.length || calc.length)) {
        submit.disabled = false
      }
      else {
        submit.disabled = true
      }
    }, 5)
  }

  async submitForm (event) {
    const titl = document.getElementById(`input-title`).value
    const desc = document.getElementById(`input-description`).value
    const calc = document.getElementById(`input-calculation`).value

    const title = (titl.length)
      ? `::titl-start::${titl}::titl-end::`
      : ``
    const description = (desc.length)
      ? `::desc-start::${desc}::desc-end::`
      : ``
    const calculation = (calc.length)
      ? `::calc-start::${calc}::calc-end::`
      : ``

    const errors = document.getElementsByClassName(`modal-error`)

    if (titl.length && (desc.length || calc.length)) {
      await this.store.dispatch(`setToken`, await this.http.get(`/token`))
      const result = await this.http.post(
        `/room/createRoomMacros`,
        {
          token: this.state.token,
          assetid: this.state.room.id,
          owner: this.state.username,
          title: title,
          description: description,
          calculation: calculation,
        }
      )

      if (result.success) {
        await this.store.dispatch(
          `updateRoomMacros`,
          {
            isCreate: true,
            macro: {
              id: result.payload.id,
              room: this.state.room.id,
              owner: this.state.username,
              title: title,
              description: description,
              calculation: calculation,
            },
          }
        )

        this.macros = this.prepareMacros()
        this.toggleModal()
      }
      else {
        console.log(`server-error: macroData`)
      }
    }
    else {
      errors.forEach((value) => { value.classList.remove(`hidden`) })

      setTimeout(() => {
        errors.forEach((value) => { value.classList.add(`hidden`) })
      }, 2500)
    }
  }
}
