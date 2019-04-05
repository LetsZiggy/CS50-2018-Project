import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'
import { Store } from 'aurelia-store'

import { roomBooleanKeys, roomArrayKeys, roomNumberKeys } from './modules/room-form'

@inject(Router, Store)
export class WS {
  constructor (Router, Store) {
    this.router = Router
    this.store = Store
  }

  handleRoomForm (payload) {
    // Convert number to boolean
    roomBooleanKeys.forEach((key) => {
      payload[key] = (typeof payload[key] === `number` && payload[key] === 1)
        ? true
        : false
    })

    // Split string to array
    roomArrayKeys.forEach((key) => {
      payload[key] = (typeof payload[key] === `string` && payload[key].length)
        ? payload[key].split(`;`)
        : []
    })

    // Convert string to number
    roomNumberKeys.forEach((key) => {
      payload[key] = (typeof payload[key] === `string`)
        ? Number(payload[key])
        : (Array.isArray(payload[key]))
          ? payload[key].map((val) => Number(val))
          : payload[key]
    })

    return payload
  }

  parseWebsocket (data, state) {
    switch (data.type) {
      case `roomUpdate`:
        this.roomUpdate(data.payload, state.roomsList, state.room)
        break

      case `roomDelete`:
        this.roomDelete(data.payload, state.username)
        break

      case `userAdd`:
        this.userAdd(data.payload, state.roomsList, state.room)
        break

      case `userRemove`:
        this.userRemove(data.payload, state.roomsList, state.room, state.username)
        break

      case `commitMessage`:
        this.commitMessage(data.payload)
        break
    }
  }

  roomUpdate (payload, roomsList, room) {
    console.log(`ws:roomUpdate`)

    const { index } = roomsList
      .map((value, index) => ({ id: value.id, index: index }))
      .filter((value) => value.id === payload.room)[0]

    payload = this.handleRoomForm(payload)

    this.store.dispatch(
      `updateRoomsListData`,
      {
        index: index,
        name: payload.name,
        passcode: payload.passcode,
        maxUsers: payload.maxUsers,
        visible: payload.visible,
      }
    )

    this.store.dispatch(
      `updateRoomData`,
      {
        name: payload.name,
        passcode: payload.passcode,
        maxUsers: payload.maxUsers,
        visible: payload.visible,
      }
    )

    return true
  }

  roomDelete (payload, username) {
    console.log(`ws:roomDelete`)
    this.router.navigateToRoute(`lobby`, { username: username })
    return true
  }

  userAdd (payload, roomsList, room) {
    console.log(`ws:userAdd`)

    const roomIndex = roomsList
      .map((value) => value.id)
      .indexOf(room.id)

    payload = this.handleRoomForm(payload)
    payload.users = [...room.users, ...payload.users]

    this.store.dispatch(
      `updateRoomsListUsers`,
      {
        index: roomIndex,
        users: [...payload.users],
      }
    )

    this.store.dispatch(
      `updateRoomUsers`,
      {
        users: [...payload.users],
      }
    )

    return true
  }

  userRemove (payload, roomsList, room, username) {
    console.log(`ws:userRemove`)

    const roomIndex = roomsList
      .map((value) => value.id)
      .indexOf(room.id)

    payload.users = room.users
      .filter((value) => value !== payload.user)

    this.store.dispatch(
      `updateRoomsListUsers`,
      {
        index: roomIndex,
        users: [...payload.users],
      }
    )

    this.store.dispatch(
      `updateRoomUsers`,
      {
        users: [...payload.users],
      }
    )

    if (payload.user === username) {
      this.router.navigateToRoute(`lobby`, { username: username })
    }

    return true
  }

  async commitMessage (payload) {
    console.log(`commitMessage`)
    await this.store.dispatch(
      `commitMessage`,
      {
        owner: payload.owner,
        datetime: payload.datetime,
        text: JSON.parse(payload.text),
      }
    )

    setTimeout(() => {
      if (document.getElementsByClassName(`message`).length) {
        const messages = document.getElementsByClassName(`message`)
        messages[messages.length - 1].scrollIntoView()
      }
    }, 0)
  }
}
