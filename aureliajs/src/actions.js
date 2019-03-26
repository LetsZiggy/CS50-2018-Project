import { nextStateHistory } from 'aurelia-store'

import { initialState } from './state'
import { tableBooleanKeys, tableArrayKeys, tableJSONKeys, tableNumberKeys } from './modules/table-form'
import { characterBooleanKeys, characterArrayKeys, characterJSONKeys, characterNumberKeys } from './modules/character-form'
import { monsterBooleanKeys, monsterArrayKeys, monsterJSONKeys, monsterNumberKeys } from './modules/monster-form'

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
  setCurrentLobby: (state, data = { currentLobby: `` }) => {
    return nextStateHistory(state, Object.assign({}, state.present, {
      lobby: {
        ...state.present.lobby,
        currentLobby: data.currentLobby,
      },
    }))
  },
  setFilterTables: (state, data = { filterTables: [] }) => {
    const value = data.filterTables
    const index = state.present.lobby.filterTables.indexOf(value)
    data.filterTables = state.present.lobby.filterTables

    if (index === -1) {
      data.filterTables.push(value)
    }
    else {
      data.filterTables.splice(index, 1)
    }

    return nextStateHistory(state, Object.assign({}, state.present, {
      lobby: {
        ...state.present.lobby,
        filterTables: data.filterTables,
      },
    }))
  },
  setFilterMonsters: (state, data = { filterMonsters: -1 }) => {
    return nextStateHistory(state, Object.assign({}, state.present, {
      lobby: {
        ...state.present.lobby,
        filterMonsters: data.filterMonsters,
      },
    }))
  },
  appendTablesList: (state, data = { tablesList: [] }) => {
    data.tablesList.forEach((value) => {
      // Convert number to boolean
      tableBooleanKeys.forEach((key) => {
        value[key] = (typeof value[key] === `number` && value[key] === 1)
          ? true
          : false
      })

      // Split string to array
      tableArrayKeys.forEach((key) => {
        value[key] = (typeof value[key] === `string` && value[key].length)
          ? value[key].split(`;`)
          : []
      })

      // Split JSON string to Javascript object
      tableJSONKeys.forEach((key) => {
        value[key[0]] = (typeof value[key[0]] === `string` && value[key[0]].length)
          ? JSON.parse(value[key[0]])
          : (key[1] === `array`)
            ? []
            : {}
      })

      // Convert string to number
      tableNumberKeys.forEach((key) => {
        value[key] = (typeof value[key] === `string`)
          ? Number(value[key])
          : (Array.isArray(value[key]))
            ? value[key].map((val) => Number(val))
            : value[key]
      })
    })

    data.tablesList = [...data.tablesList, ...state.present.lobby.tablesList]

    // List unique tableIDs
    const ids = data.tablesList
      .map((value) => value.id)
      .filter((value, index, array) => array.indexOf(value) === index)

    // List unique tableItems
    data.tablesList = data.tablesList
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
        tablesList: data.tablesList,
      },
    }))
  },
  appendCharactersList: (state, data = { charactersList: [] }) => {
    data.charactersList.forEach((value) => {
      // Convert number to boolean
      characterBooleanKeys.forEach((key) => {
        value[key] = (typeof value[key] === `number` && value[key] === 1)
          ? true
          : false
      })

      // Split string to array
      characterArrayKeys.forEach((key) => {
        value[key] = (typeof value[key] === `string` && value[key].length)
          ? value[key].split(`;`)
          : []
      })

      // Split JSON string to Javascript object
      characterJSONKeys.forEach((key) => {
        value[key[0]] = value[key[0]].map((mapValue) => {
          if (typeof mapValue === `string` && mapValue.length) {
            if (key[1] === `string`) {
              return (mapValue.replace(/<br\s\/>/g, `\n`))
            }
            else {
              return (JSON.parse(mapValue))
            }
          }
          else {
            if (key[1] === `string`) {
              return (``)
            }
            else if (key[1] === `array`) {
              return ([])
            }
            else {
              return ({})
            }
          }
        })
      })

      // Convert string to number
      characterNumberKeys.forEach((key) => {
        value[key] = Number(value[key])
      })
    })

    data.charactersList = [...data.charactersList, ...state.present.lobby.charactersList]

    // List unique characterIDs
    const ids = data.charactersList
      .map((value) => value.id)
      .filter((value, index, array) => array.indexOf(value) === index)

    // List unique characterItems
    data.charactersList = data.charactersList
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
        charactersList: data.charactersList,
      },
    }))
  },
  appendMonstersList: (state, data = { monstersList: [] }) => {
    data.monstersList.forEach((value) => {
      // Convert number to boolean
      monsterBooleanKeys.forEach((key) => {
        value[key] = (typeof value[key] === `number` && value[key] === 1)
          ? true
          : false
      })

      // Split string to array
      monsterArrayKeys.forEach((key) => {
        value[key] = (typeof value[key] === `string` && value[key].length)
          ? value[key].split(`;`)
          : []
      })

      // Split JSON string to Javascript object
      monsterJSONKeys.forEach((key) => {
        value[key[0]] = value[key[0]].map((mapValue) => {
          if (typeof mapValue === `string` && mapValue.length) {
            if (key[1] === `string`) {
              return (mapValue.replace(/<br\s\/>/g, `\n`))
            }
            else {
              return (JSON.parse(mapValue))
            }
          }
          else {
            if (key[1] === `string`) {
              return (``)
            }
            else if (key[1] === `array`) {
              return ([])
            }
            else {
              return ({})
            }
          }
        })
      })

      // Convert string to number
      monsterNumberKeys.forEach((key) => {
        value[key] = Number(value[key])
      })
    })

    data.monstersList = [...data.monstersList, ...state.present.lobby.monstersList]

    // List unique monsterIDs
    const ids = data.monstersList
      .map((value) => value.id)
      .filter((value, index, array) => array.indexOf(value) === index)

    // List unique monsterItems
    data.monstersList = data.monstersList
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
        monstersList: data.monstersList,
      },
    }))
  },
  updateTableAssets: (state, data = { charactersIDs: [], charactersList: [], monstersIDs: [], monstersList: [], messages: [] }) => {
    data.charactersList.forEach((value) => {
      // Convert number to boolean
      characterBooleanKeys.forEach((key) => {
        value[key] = (typeof value[key] === `number` && value[key] === 1)
          ? true
          : false
      })

      // Split string to array
      characterArrayKeys.forEach((key) => {
        value[key] = (typeof value[key] === `string` && value[key].length)
          ? value[key].split(`;`)
          : []
      })

      // Split JSON string to Javascript object
      characterJSONKeys.forEach((key) => {
        value[key[0]] = value[key[0]].map((mapValue) => {
          if (typeof mapValue === `string` && mapValue.length) {
            if (key[1] === `string`) {
              return (mapValue.replace(/<br\s\/>/g, `\n`))
            }
            else {
              return (JSON.parse(mapValue))
            }
          }
          else {
            if (key[1] === `string`) {
              return (``)
            }
            else if (key[1] === `array`) {
              return ([])
            }
            else {
              return ({})
            }
          }
        })
      })

      // Convert string to number
      characterNumberKeys.forEach((key) => {
        value[key] = Number(value[key])
      })
    })

    data.charactersList = [...data.charactersList, ...state.present.lobby.charactersList]

    // List unique characterIDs
    const charactersIDs = data.charactersList
      .map((value) => value.id)
      .filter((value, index, array) => array.indexOf(value) === index)
      .filter((value) => data.charactersIDs.includes(value))

    // List unique characterItems
    data.charactersList = data.charactersList
      .filter((value) => charactersIDs.includes(value.id))
      .reduce((acc, value) => {
        const index = charactersIDs.indexOf(value.id)

        if (index !== -1) {
          acc.push(value)
          charactersIDs.splice(index, 1)
        }

        return acc
      }, [])

    data.monstersList.forEach((value) => {
      // Convert number to boolean
      monsterBooleanKeys.forEach((key) => {
        value[key] = (typeof value[key] === `number` && value[key] === 1)
          ? true
          : false
      })

      // Split string to array
      monsterArrayKeys.forEach((key) => {
        value[key] = (typeof value[key] === `string` && value[key].length)
          ? value[key].split(`;`)
          : []
      })

      // Split JSON string to Javascript object
      monsterJSONKeys.forEach((key) => {
        value[key[0]] = value[key[0]].map((mapValue) => {
          if (typeof mapValue === `string` && mapValue.length) {
            if (key[1] === `string`) {
              return (mapValue.replace(/<br\s\/>/g, `\n`))
            }
            else {
              return (JSON.parse(mapValue))
            }
          }
          else {
            if (key[1] === `string`) {
              return (``)
            }
            else if (key[1] === `array`) {
              return ([])
            }
            else {
              return ({})
            }
          }
        })
      })

      // Convert string to number
      monsterNumberKeys.forEach((key) => {
        value[key] = Number(value[key])
      })
    })

    data.monstersList = [...data.monstersList, ...state.present.lobby.monstersList]

    // List unique monsterIDs
    const monstersIDs = data.monstersList
      .map((value) => value.id)
      .filter((value, index, array) => array.indexOf(value) === index)
      .filter((value) => data.monstersIDs.includes(value))

    // List unique monsterItems
    data.monstersList = data.monstersList
      .filter((value) => monstersIDs.includes(value.id))
      .reduce((acc, value) => {
        const index = monstersIDs.indexOf(value.id)

        if (index !== -1) {
          acc.push(value)
          monstersIDs.splice(index, 1)
        }

        return acc
      }, [])

    // JSON.parse message text
    data.messages.forEach((value) => {
      value.text = JSON.parse(value.text)
    })

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      table: {
        ...state.present.table,
        charactersList: [...data.charactersList],
        monstersList: [...data.monstersList],
        messages: [...data.messages],
      },
    }))
  },
  updateTableAssetsData: (state, data = { type: ``, payload: {} }) => {
    data[`update`] = {}

    if (data.type === `characterUpdate`) {
      data.update[`charactersList`] = [...state.present.table.charactersList]

      data.update.charactersList.forEach((value, index) => {
        if (Number(value.id) === Number(data.payload.id)) {
          data.update.charactersList[index] = {
            ...value,
            ...data.payload,
          }
        }
      })
    }

    if (data.type === `monsterUpdate`) {
      data.update[`monstersList`] = [...state.present.table.monstersList]

      data.update.monstersList.forEach((value, index) => {
        if (Number(value.id) === Number(data.payload.id)) {
          data.update.monstersList[index] = {
            ...value,
            ...data.payload,
          }
        }
      })
    }

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      table: {
        ...state.present.table,
        ...data.update
      },
    }))
  },
  updateTablesListMonsters: (state, data = { index: null, monstersIDs: [], monstersData: [] }) => {
    data.tablesList = [...state.present.lobby.tablesList]

    data.tablesList[data.index].monstersIDs = [...data.monstersIDs]
    data.tablesList[data.index].monstersData = [...data.monstersData]

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      lobby: {
        ...state.present.lobby,
        tablesList: data.tablesList,
      },
    }))
  },
  updateTableMonsters: (state, data = { monstersIDs: [], monstersList: [], monstersData: [] }) => {
    data.monstersList.forEach((value) => {
      // Convert number to boolean
      monsterBooleanKeys.forEach((key) => {
        value[key] = (typeof value[key] === `number` && value[key] === 1)
          ? true
          : false
      })

      // Split string to array
      monsterArrayKeys.forEach((key) => {
        value[key] = (typeof value[key] === `string` && value[key].length)
          ? value[key].split(`;`)
          : []
      })

      // Split JSON string to Javascript object
      monsterJSONKeys.forEach((key) => {
        value[key[0]] = value[key[0]].map((mapValue) => {
          if (typeof mapValue === `string` && mapValue.length) {
            if (key[1] === `string`) {
              return (mapValue.replace(/<br\s\/>/g, `\n`))
            }
            else {
              return (JSON.parse(mapValue))
            }
          }
          else {
            if (key[1] === `string`) {
              return (``)
            }
            else if (key[1] === `array`) {
              return ([])
            }
            else {
              return ({})
            }
          }
        })
      })

      // Convert string to number
      monsterNumberKeys.forEach((key) => {
        value[key] = Number(value[key])
      })
    })

    // List unique monsterIDs
    const ids = data.monstersList
      .map((value) => value.id)
      .filter((value, index, array) => array.indexOf(value) === index)

    // List unique monsterItems
    data.monstersList = data.monstersList
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
      table: {
        ...state.present.table,
        ...data,
      },
    }))
  },
  updateTablesListCharacters: (state, data = { index: null, players: [], charactersIDs: [], charactersData: [] }) => {
    data.tablesList = [...state.present.lobby.tablesList]

    data.tablesList[data.index].players = [...data.players]
    data.tablesList[data.index].charactersIDs = [...data.charactersIDs]
    data.tablesList[data.index].charactersData = [...data.charactersData]

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      lobby: {
        ...state.present.lobby,
        tablesList: data.tablesList,
      },
    }))
  },
  updateTableCharacters: (state, data = { players: [], charactersIDs: [], charactersList: [], charactersData: [] }) => {
    data.charactersList.forEach((value) => {
      // Convert number to boolean
      characterBooleanKeys.forEach((key) => {
        value[key] = (typeof value[key] === `number` && value[key] === 1)
          ? true
          : false
      })

      // Split string to array
      characterArrayKeys.forEach((key) => {
        value[key] = (typeof value[key] === `string` && value[key].length)
          ? value[key].split(`;`)
          : []
      })

      // Split JSON string to Javascript object
      characterJSONKeys.forEach((key) => {
        value[key[0]] = value[key[0]].map((mapValue) => {
          if (typeof mapValue === `string` && mapValue.length) {
            if (key[1] === `string`) {
              return (mapValue.replace(/<br\s\/>/g, `\n`))
            }
            else {
              return (JSON.parse(mapValue))
            }
          }
          else {
            if (key[1] === `string`) {
              return (``)
            }
            else if (key[1] === `array`) {
              return ([])
            }
            else {
              return ({})
            }
          }
        })
      })

      // Convert string to number
      characterNumberKeys.forEach((key) => {
        value[key] = Number(value[key])
      })
    })

    // List unique characterIDs
    const ids = data.charactersList
      .map((value) => value.id)
      .filter((value, index, array) => array.indexOf(value) === index)

    // List unique characterItems
    data.charactersList = data.charactersList
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
      table: {
        ...state.present.table,
        ...data,
      },
    }))
  },
  // updateTablesListData: (state, data = { index: null, name: `Table Name`, passcode: ``, maxPlayers: 4, published: false }) => {
  //   data.tablesList = [...state.present.lobby.tablesList]

  //   data.tablesList[data.index].name = data.name
  //   data.tablesList[data.index].passcode = data.passcode
  //   data.tablesList[data.index].maxPlayers = data.maxPlayers
  //   data.tablesList[data.index].published = data.published

  //   // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
  //   return nextStateHistory(state, Object.assign({}, state.present, {
  //     lobby: {
  //       ...state.present.lobby,
  //       tablesList: data.tablesList,
  //     },
  //   }))
  // },
  updateTableData: (state, data = { name: `Table Name`, passcode: ``, maxPlayers: 4, published: false }) => {
    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      table: {
        ...state.present.table,
        ...data,
      },
    }))
  },
  // updateCharactersListCharacter: (state, data = { index: null, coinCopper: 0, coinSilver: 0, coinElectrum: 0, coinGold: 0, coinPlatinum: 0, notes: `` }) => {
  //   data.charactersList = [...state.present.lobby.charactersList]

  //   data.charactersList[data.index].coinCopper = data.coinCopper
  //   data.charactersList[data.index].coinSilver = data.coinSilver
  //   data.charactersList[data.index].coinElectrum = data.coinElectrum
  //   data.charactersList[data.index].coinGold = data.coinGold
  //   data.charactersList[data.index].coinPlatinum = data.coinPlatinum
  //   data.charactersList[data.index].notes = data.notes

  //   // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
  //   return nextStateHistory(state, Object.assign({}, state.present, {
  //     lobby: {
  //       ...state.present.lobby,
  //       charactersList: [...data.charactersList],
  //     },
  //   }))
  // },
  updateTableCharacter: (state, data = { index: null, coinCopper: 0, coinSilver: 0, coinElectrum: 0, coinGold: 0, coinPlatinum: 0, notes: `` }) => {
    data.charactersList = [...state.present.table.charactersList]

    data.charactersList[data.index].coinCopper = data.coinCopper
    data.charactersList[data.index].coinSilver = data.coinSilver
    data.charactersList[data.index].coinElectrum = data.coinElectrum
    data.charactersList[data.index].coinGold = data.coinGold
    data.charactersList[data.index].coinPlatinum = data.coinPlatinum
    data.charactersList[data.index].notes = data.notes

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      table: {
        ...state.present.table,
        charactersList: [...data.charactersList],
      },
    }))
  },
  commitCharacterChanges: (state, data = { index: null, value: {} }) => {
    data.list = [...state.present.lobby.charactersList]
    data.list[data.index] = Object.assign({}, data.list[data.index], data.value)

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      lobby: {
        ...state.present.lobby,
        charactersList: [...data.list],
      },
    }))
  },
  commitMonsterChanges: (state, data = { index: null, value: {} }) => {
    data.list = [...state.present.lobby.monstersList]
    data.list[data.index] = Object.assign({}, data.list[data.index], data.value)

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      lobby: {
        ...state.present.lobby,
        monstersList: [...data.list],
      },
    }))
  },
  setTableData: (state, data = { default: {}, index: null, value: {} }) => {
    if (!data.hasOwnProperty(`value`)) {
      data.value = Object.assign({}, data.default, {
        ...state.present.lobby.tablesList[data.index],
      })
    }

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      table: {
        ...state.present.table,
        ...data.value,
      },
    }))
  },
  setCharacterData: (state, data = { default: {}, index: null, value: {} }) => {
    if (!data.hasOwnProperty(`value`)) {
      data.value = Object.assign({}, data.default, {
        ...state.present.lobby.charactersList[data.index],
      })
    }

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      character: {
        ...state.present.character,
        ...data.value,
      },
    }))
  },
  setMonsterData: (state, data = { default: {}, index: null, value: {} }) => {
    if (!data.hasOwnProperty(`value`)) {
      data.value = Object.assign({}, data.default, {
        ...state.present.lobby.monstersList[data.index],
      })
    }

    // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      monster: {
        ...state.present.monster,
        ...data.value,
      },
    }))
  },
  deleteTable: (state, data = { index: null, id: null }) => {
    data.tablesList = state.present.lobby.tablesList
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
        tablesList: data.tablesList,
      },
    }))
  },
  deleteCharacter: (state, data = { index: null, id: null }) => {
    data.charactersList = state.present.lobby.charactersList
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
        charactersList: data.charactersList,
      },
    }))
  },
  deleteMonster: (state, data = { index: null, id: null }) => {
    data.monstersList = state.present.lobby.monstersList
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
        monstersList: data.monstersList,
      },
    }))
  },
  commitMessage: (state, data = { table: null, username: ``, senderID: null, senderName: ``, type: ``, text: [], action: {} }) => {
    if (data.type === `typeAction`) {
      // TODO
    }

    // // https://github.com/reduxjs/redux/issues/432#issuecomment-129145245
    return nextStateHistory(state, Object.assign({}, state.present, {
      table: {
        ...state.present.table,
        messages: [...state.present.table.messages, data],
      },
    }))
  },
}
