import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'
import { Store, connectTo } from 'aurelia-store'
import { pluck, distinctUntilChanged } from 'rxjs/operators'

import { HTTP } from '../http'
import { Actions } from '../actions'
import { lobbyForm } from './lobby-form'
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
    filterRooms: (store) => store.state.pipe(
      pluck(`present`, `lobby`, `filterRooms`),
      distinctUntilChanged()
    ),
    roomsList: (store) => store.state.pipe(
      pluck(`present`, `lobby`, `roomsList`),
      distinctUntilChanged()
    ),
  },
})
@inject(Router, Store, HTTP)
export class Lobby {
  constructor (Router, Store, HTTP) {
    this.router = Router
    this.store = Store
    this.http = HTTP
    this.storage = {}
    this.options = { ...lobbyForm }
  }

  // Check if cookies still valid
  canActivate (params, routeConfig, navigationInstruction) {
    const username = document.cookie.split(`;`)
      .reduce((acc, value) => (value.includes(`username=`))
        ? value.split(`=`)[1]
        : acc, ``)

    if (username === `` || params.username !== username) {
      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`entrance`)
    }

    this.storage[`params`] = params
  }

  async bind (bindingContext, overrideContext) {
    this.store.registerAction(`setToken`, Actions.setToken)
    this.store.registerAction(`setUsername`, Actions.setUsername)
    this.store.registerAction(`setFilterRooms`, Actions.setFilterRooms)
    this.store.registerAction(`appendRoomsList`, Actions.appendRoomsList)
    this.store.registerAction(`updateRoomsListUsers`, Actions.updateRoomsListUsers)
    this.store.registerAction(`setRoomData`, Actions.setRoomData)
    this.store.registerAction(`deleteRoom`, Actions.deleteRoom)

    // Add username to state if enter lobby directly with valid cookies
    if (!this.state.username) {
      this.store.dispatch(
        `setUsername`,
        {
          username: this.storage.params.username,
        }
      )
    }

    this.getData()
  }

  unbind () {
    this.store.unregisterAction(`setToken`, Actions.setToken)
    this.store.unregisterAction(`setUsername`, Actions.setUsername)
    this.store.unregisterAction(`setFilterRooms`, Actions.setFilterRooms)
    this.store.unregisterAction(`appendRoomsList`, Actions.appendRoomsList)
    this.store.unregisterAction(`updateRoomsListUsers`, Actions.updateRoomsListUsers)
    this.store.unregisterAction(`setRoomData`, Actions.setRoomData)
    this.store.unregisterAction(`deleteRoom`, Actions.deleteRoom)
  }

  // Get rooms
  async getData () {
    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/lobby/getAll`,
      {
        token: this.state.token,
      }
    )

    if (result.success) {
      this.store.dispatch(
        `appendRoomsList`,
        {
          roomsList: result.payload.roomsList,
        }
      )
    }
    else {
      console.log(`server-error: getAll`)

      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`entrance`)
    }
  }

  // Set filter rooms
  async updateFilterRooms (type) {
    await this.store.dispatch(
      `setFilterRooms`,
      {
        filterRooms: `hide-${type}`,
      }
    )

    return true
  }

  // Create new room
  async createRoom () {
    // Get new room id
    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/lobby/create`,
      {
        token: this.state.token,
        modelType: `room`,
      }
    )

    if (result.success) {
      this.store.dispatch(
        `appendRoomsList`,
        {
          roomsList: [
            {
              ...roomDefault,
              id: result.payload.id,
              owner: this.state.username,
            },
          ],
        }
      )

      this.store.dispatch(
        `setRoomData`,
        {
          value: {
            ...roomDefault,
            id: result.payload.id,
            owner: this.state.username,
          },
        }
      )

      this.route({ route: `room`, id: result.payload.id, action: `new` })
      return true
    }

    document.getElementById(`server-error`).classList.remove(`hidden`)

    setTimeout(() => {
      if (document.getElementById(`server-error`)) {
        document.getElementById(`server-error`).classList.add(`hidden`)
      }

      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`entrance`)
    }, 2500)

    return false
  }

  enableJoinButton (index) {
    setTimeout(() => {
      const joinButton = document.getElementById(`join-${index}`)
      const passcode = document.getElementById(`passcode-${index}`)

      joinButton.disabled = (passcode.value.length)
        ? false
        : true
    }, 0)
  }

  // Route to item page
  async route (data) {
    // Check if user joining in
    if (data.route === `room` && data.action !== `new`) {
      data.room = this.state.roomsList[data.index]
      data.action =
        (data.room.owner !== this.state.username && !data.room.users.includes(this.state.username))
          ? `join`
          : `play`
    }

    // New item handled by this.create()
    if (data.action === `new`) {
      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(data.route, { assetid: data.id })
      return true
    }
    // User entering item with ownership
    else if (data.action === `play`) {
      await this.store.dispatch(`setToken`, await this.http.get(`/token`))
      const result = await this.http.post(
        `/${data.route}/setCookies`,
        {
          token: this.state.token,
          assetid: data.id,
        }
      )

      if (result.success) {
        // const dispatchTitleCase = data.route.toLowerCase().replace(/(^[a-z])/g, match => match.toUpperCase())
        // this.store.dispatch(`set${dispatchTitleCase}Data`, result.payload)

        // https://stackoverflow.com/a/36973396
        this.router.navigateToRoute(data.route, { assetid: data.id })
        return true
      }
    }
    // User entering item without ownership
    else if (data.action === `join`) {
      // Check if passcode is required || is matching
      const canJoin =
        (data.room.passcode.length)
          ? (document.getElementById(`passcode-${data.index}`).value !== data.room.passcode)
            ? false
            : true
          : true

      // Show error
      if (!canJoin) {
        document.getElementById(`join-error-${data.index}`).classList.remove(`hidden`)
        document.getElementById(`join-error-${data.index}`).nextSibling.classList.add(`hidden`)

        setTimeout(() => {
          if (document.getElementById(`join-error-${data.index}`)) {
            document.getElementById(`join-error-${data.index}`).classList.add(`hidden`)
            document.getElementById(`join-error-${data.index}`).nextSibling.classList.remove(`hidden`)
          }
        }, 2500)

        return false
      }
      // Add user to item ownership
      else if (canJoin) {
        data.users = [
          ...this.state.roomsList[data.index].users,
          this.state.username,
        ]

        await this.store.dispatch(`setToken`, await this.http.get(`/token`))
        const result = await this.http.post(
          `/room/updateRoomUsers`,
          {
            token: this.state.token,
            assetid: data.id,
            users: data.users.join(`;`),
            websocketType: `userAdd`,
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

          const dispatchTitleCase = data.route.toLowerCase().replace(/(^[a-z])/g, match => match.toUpperCase())
          this.store.dispatch(`set${dispatchTitleCase}Data`, result.payload)

          // https://stackoverflow.com/a/36973396
          this.router.navigateToRoute(data.route, { assetid: data.id })
          return true
        }
      }
    }

    document.getElementById(`server-error`).classList.remove(`hidden`)

    setTimeout(() => {
      if (document.getElementById(`server-error`)) {
        document.getElementById(`server-error`).classList.add(`hidden`)
      }

      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`entrance`)
    }, 2500)

    return false
  }

  async delete (data) {
    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/${data.route}/delete`,
      {
        token: this.state.token,
        assetid: data.id,
      }
    )

    if (result.success) {
      const dispatchTitleCase = data.route.toLowerCase().replace(/(^[a-z])/g, match => match.toUpperCase())

      this.store.dispatch(
        `delete${dispatchTitleCase}`,
        {
          index: data.index,
          id: data.id,
        }
      )
    }

    return true
  }
}
