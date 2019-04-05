import { nextStateHistory } from 'aurelia-store'

import { initialState } from './state'
import { roomBooleanKeys, roomArrayKeys, roomNumberKeys } from './modules/room-form'

// https://aurelia.io/docs/plugins/store#making-our-app-history-aware
// https://github.com/zewa666/aurelia-store-examples/blob/master/markdown/src/actions.ts
export const Actions = {
  resetState: (state) => {
    return nextStateHistory(state, initialState)
  },
  setToken: (state, data = { token: `` }) => {
    return nextStateHistory(state, Object.assign({}, state.present, {
      token: data.token,
    }))
  },
  setUsername: (state, data = { username: `` }) => {
    return nextStateHistory(state, Object.assign({}, state.present, {
      username: data.username,
    }))
  },
  setFilterRooms: (state, data = { filterRooms: [] }) => {
    const value = data.filterRooms
    const index = state.present.lobby.filterRooms.indexOf(value)
    data.filterRooms = state.present.lobby.filterRooms

    if (index === -1) {
      data.filterRooms.push(value)
    }
    else {
      data.filterRooms.splice(index, 1)
    }

    return nextStateHistory(state, Object.assign({}, state.present, {
      lobby: {
        ...state.present.lobby,
        filterRooms: data.filterRooms,
      },
    }))
  },
  appendRoomsList: (state, data = { roomsList: [] }) => {
    data.roomsList.forEach((value) => {
      // Convert number to boolean
      roomBooleanKeys.forEach((key) => {
        value[key] = (typeof value[key] === `number` && value[key] === 1)
          ? true
          : false
      })

      // Split string to array
      roomArrayKeys.forEach((key) => {
        value[key] = (typeof value[key] === `string` && value[key].length)
          ? value[key].split(`;`)
          : []
      })

      // Convert string to number
      roomNumberKeys.forEach((key) => {
        value[key] = (typeof value[key] === `string`)
          ? Number(value[key])
          : (Array.isArray(value[key]))
            ? value[key].map((val) => Number(val))
            : value[key]
      })
    })

    data.roomsList = [...data.roomsList, ...state.present.lobby.roomsList]

    // List unique roomIDs
    const ids = data.roomsList
      .map((value) => value.id)
      .filter((value, index, array) => array.indexOf(value) === index)

    // List unique roomItems
    data.roomsList = data.roomsList
      .reduce((acc, value) => {
        const index = ids.indexOf(value.id)

        if (index !== -1) {
          acc.push(value)
          ids.splice(index, 1)
        }

        return acc
      }, [])

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      lobby: {
        ...state.present.lobby,
        roomsList: data.roomsList,
      },
    }))
  },
  updateRoomsListUsers: (state, data = { index: null, users: [] }) => {
    data.roomsList = [...state.present.lobby.roomsList]
    data.roomsList[data.index] = {
      ...data.roomsList[data.index],
      users: data.users,
    }

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      lobby: {
        ...state.present.lobby,
        roomsList: data.roomsList,
      },
    }))
  },
  updateRoomUsers: (state, data = { users: [] }) => {
    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      room: {
        ...state.present.room,
        ...data,
      },
    }))
  },
  updateRoomsListData: (state, data = { index: null, name: `Room Name`, passcode: ``, maxUsers: 4, visible: false }) => {
    data.roomsList = [...state.present.lobby.roomsList]
    data.roomsList[data.index] = {
      ...data.roomsList[data.index],
      name: data.name,
      visible: data.visible,
      passcode: data.passcode,
      maxUsers: data.maxUsers,
    }

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      lobby: {
        ...state.present.lobby,
        roomsList: data.roomsList,
      },
    }))
  },
  updateRoomData: (state, data = { name: `Room Name`, passcode: ``, maxUsers: 4, visible: false }) => {
    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      room: {
        ...state.present.room,
        ...data,
      },
    }))
  },
  updateRoomMacros: (state, data = { isCreate: false, macro: {}, macros: [] }) => {
    if (data.macros && Array.isArray(data.macros)) {
      data.macros = [ ...state.present.room.macros, ...data.macros ]

      // List unique macroIDs
      const ids = data.macros
        .map((value) => value.id)
        .filter((value, index, array) => array.indexOf(value) === index)

      // List unique macros
      data.macros = data.macros
        .reduce((acc, value) => {
          const index = ids.indexOf(value.id)

          if (index !== -1) {
            acc.push(value)
            ids.splice(index, 1)
          }

          return acc
        }, [])
    }
    else if (data.isCreate) {
      data.macros = [ ...state.present.room.macros, data.macro ]
    }
    else {
      data.macros = state.present.room.macros
        .filter((value) => value.id !== data.macro.id)
    }

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      room: {
        ...state.present.room,
        macros: data.macros,
      },
    }))
  },
  setRoomData: (state, data = { default: {}, index: null, value: {} }) => {
    if (!data.hasOwnProperty(`value`)) {
      data.value = Object.assign({}, data.default, {
        ...state.present.lobby.roomsList[data.index],
      })
    }

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      room: {
        ...state.present.room,
        ...data.value,
      },
    }))
  },
  deleteRoom: (state, data = { index: null, id: null }) => {
    data.roomsList = state.present.lobby.roomsList
      .reduce((acc, value, index) => {
        if (index !== data.index && value.id !== data.id) {
          acc.push(value)
        }

        return acc
      }, [])

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      lobby: {
        ...state.present.lobby,
        roomsList: data.roomsList,
      },
    }))
  },
  updateRoomMessages: (state, data = { messages: [] }) => {
    data.messages = data.messages.map((value) => {
      value.text = JSON.parse(value.text)
      return value
    })

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      room: {
        ...state.present.room,
        ...data,
      },
    }))
  },
  commitMessage: (state, data = { room: null, owner: ``, utc: null, title: ``, text: [] }) => {
    // // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      room: {
        ...state.present.room,
        messages: [...state.present.room.messages, data],
      },
    }))
  },
}
