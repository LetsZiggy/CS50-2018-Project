import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'
import { Store } from 'aurelia-store'

import { tableBooleanKeys, tableArrayKeys, tableJSONKeys, tableNumberKeys } from './modules/table-form'
// import { characterBooleanKeys, characterArrayKeys, characterNumberKeys } from './modules/character-form'
// import { monsterBooleanKeys, monsterArrayKeys, monsterNumberKeys } from './modules/monster-form'

@inject(Router, Store)
export class WS {
  constructor (Router, Store) {
    this.router = Router
    this.store = Store
  }

  handleTableForm (payload) {
    // Convert number to boolean
    tableBooleanKeys.forEach((key) => {
      payload[key] = (typeof payload[key] === `number` && payload[key] === 1)
        ? true
        : false
    })

    // Split string to array
    tableArrayKeys.forEach((key) => {
      payload[key] = (typeof payload[key] === `string` && payload[key].length)
        ? payload[key].split(`;`)
        : []
    })

    // Split JSON string to Javascript object
    tableJSONKeys.forEach((key) => {
      payload[key[0]] = (typeof payload[key[0]] === `string` && payload[key[0]].length)
        ? JSON.parse(payload[key[0]])
        : (key[1] === `array`)
          ? []
          : {}
    })

    // Convert string to number
    tableNumberKeys.forEach((key) => {
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
      case `tableUpdate`:
        this.tableUpdate(data.payload, state.tablesList, state.table)
        break

      case `tableDelete`:
        this.tableDelete(data.payload, state.username)
        break

      case `characterAdd`:
        this.characterAdd(data.payload, state.tablesList, state.table)
        break

      case `characterRemove`:
        this.characterRemove(data.payload, state.tablesList, state.table, state.username)
        break

      case `characterUpdate`:
        this.characterUpdate(data.payload)
        break

      case `characterDelete`:
        this.characterDelete(data.payload, state.tablesList, state.table)
        break

      case `monsterAdd`:
        this.monsterAdd(data.payload, state.tablesList, state.table)
        break

      case `monsterRemove`:
        this.monsterRemove(data.payload, state.tablesList, state.table)
        break

      case `monsterUpdate`:
        this.monsterUpdate(data.payload)
        break

      case `monsterDelete`:
        this.monsterDelete(data.payload, state.tablesList, state.table)
        break

      case `commitMessage`:
        this.commitMessage(data.payload)
        break
    }
  }

  tableUpdate (payload, tablesList, table) {
    console.log(`ws:tableUpdate`)

    const { index } = tablesList
      .map((value, index) => ({ id: value.id, index: index }))
      .filter((value) => value.id === payload.table)[0]

    payload = this.handleTableForm(payload)

    this.store.dispatch(
      `updateTablesListData`,
      {
        index: index,
        name: payload.name,
        passcode: payload.passcode,
        maxPlayers: payload.maxPlayers,
        published: payload.published,
      }
    )

    this.store.dispatch(
      `updateTableData`,
      {
        name: payload.name,
        passcode: payload.passcode,
        maxPlayers: payload.maxPlayers,
        published: payload.published,
      }
    )

    return true
  }

  tableDelete (payload, username) {
    console.log(`ws:tableDelete`)
    this.router.navigateToRoute(`lobby`, { username: username })
    return true
  }

  characterAdd (payload, tablesList, table) {
    console.log(`ws:characterAdd`)

    const tableIndex = tablesList
      .map((value) => value.id)
      .indexOf(table.id)

    payload = this.handleTableForm(payload)
    payload.charactersList = [...table.charactersList, ...payload.charactersList]

    this.store.dispatch(
      `updateTablesListCharacters`,
      {
        index: tableIndex,
        players: [...payload.players],
        charactersIDs: [...payload.charactersIDs],
        charactersData: [...payload.charactersData],
      }
    )

    this.store.dispatch(
      `updateTableCharacters`,
      {
        players: [...payload.players],
        charactersIDs: [...payload.charactersIDs],
        charactersList: [...payload.charactersList],
        charactersData: [...payload.charactersData],
      }
    )

    return true
  }

  characterRemove (payload, tablesList, table, username) {
    console.log(`ws:characterRemove`)

    const tableIndex = tablesList
      .map((value) => value.id)
      .indexOf(table.id)

    payload.players = table.players
      .filter((value) => value !== payload.player)

    payload.charactersIDs = table.charactersIDs
      .filter((value) => value !== payload.characterID)

    payload.charactersList = table.charactersList
      .filter((value) => value.id !== payload.characterID)

    payload.charactersData = table.charactersData
      .filter((value) => value.id !== payload.characterID)

    this.store.dispatch(
      `updateTablesListCharacters`,
      {
        index: tableIndex,
        players: [...payload.players],
        charactersIDs: [...payload.charactersIDs],
        charactersData: [...payload.charactersData],
      }
    )

    this.store.dispatch(
      `updateTableCharacters`,
      {
        players: [...payload.players],
        charactersIDs: [...payload.charactersIDs],
        charactersList: [...payload.charactersList],
        charactersData: [...payload.charactersData],
      }
    )

    if (payload.player === username) {
      this.router.navigateToRoute(`lobby`, { username: username })
    }

    return true
  }

  characterUpdate (payload) {
    console.log(`ws:characterUpdate`)
    this.store.dispatch(
      `updateTableAssetsData`,
      {
        type: `characterUpdate`,
        payload: payload,
      }
    )

    return true
  }

  characterDelete (payload, tablesList, table) {
    console.log(`ws:characterDelete`)
    let filter = null

    const tableIndex = tablesList
      .map((value) => value.id)
      .indexOf(table.id)

    const characterIndex = table.charactersIDs
      .indexOf(payload.id)

    filter = table.players[characterIndex]
    payload[`players`] = table.players
      .filter((value) => value !== filter)

    filter = table.charactersIDs[characterIndex]
    payload[`charactersIDs`] = table.charactersIDs
      .filter((value) => value !== filter)

    filter = table.charactersList[characterIndex]
    payload[`charactersList`] = table.charactersList
      .filter((value) => value.id !== filter.id)

    filter = table.charactersData[characterIndex]
    payload[`charactersData`] = table.charactersData
      .filter((value) => value.id !== filter.id)

    this.store.dispatch(
      `updateTablesListCharacters`,
      {
        index: tableIndex,
        players: [...payload.players],
        charactersIDs: [...payload.charactersIDs],
        charactersData: [...payload.charactersData],
      }
    )

    this.store.dispatch(
      `updateTableCharacters`,
      {
        players: [...payload.players],
        charactersIDs: [...payload.charactersIDs],
        charactersList: [...payload.charactersList],
        charactersData: [...payload.charactersData],
      }
    )

    return true
  }

  monsterAdd (payload, tablesList, table) {
    console.log(`ws:monsterAdd`)

    const tableIndex = tablesList
      .map((value) => value.id)
      .indexOf(table.id)

    payload = this.handleTableForm(payload)
    payload.monstersList = [...table.monstersList, ...payload.monstersList]

    this.store.dispatch(
      `updateTablesListMonsters`,
      {
        index: tableIndex,
        monstersIDs: [...payload.monstersIDs],
        monstersData: [...payload.monstersData],
      }
    )

    this.store.dispatch(
      `updateTableMonsters`,
      {
        monstersIDs: [...payload.monstersIDs],
        monstersList: [...payload.monstersList],
        monstersData: [...payload.monstersData],
      }
    )

    return true
  }

  monsterRemove (payload, tablesList, table) {
    console.log(`ws:monsterRemove`)

    const tableIndex = tablesList
      .map((value) => value.id)
      .indexOf(table.id)

    payload.monstersIDs = table.monstersIDs
      .filter((value) => value !== payload.monsterID)

    payload.monstersList = table.monstersList
      .filter((value) => value.id !== payload.monsterID)

    payload.monstersData = table.monstersData
      .filter((value) => value.id !== payload.monsterID)

    this.store.dispatch(
      `updateTablesListMonsters`,
      {
        index: tableIndex,
        monstersIDs: [...payload.monstersIDs],
        monstersData: [...payload.monstersData],
      }
    )

    this.store.dispatch(
      `updateTableMonsters`,
      {
        monstersIDs: [...payload.monstersIDs],
        monstersList: [...payload.monstersList],
        monstersData: [...payload.monstersData],
      }
    )

    return true
  }

  monsterUpdate (payload) {
    console.log(`ws:monsterUpdate`)
    this.store.dispatch(
      `updateTableAssetsData`,
      {
        type: `monsterUpdate`,
        payload: payload,
      }
    )

    return true
  }

  monsterDelete (payload, tablesList, table) {
    console.log(`ws:monsterDelete`)
    let filter = null

    const tableIndex = tablesList
      .map((value) => value.id)
      .indexOf(table.id)

    const monsterIndex = table.monstersIDs
      .indexOf(payload.id)

    filter = table.monstersIDs[monsterIndex]
    payload[`monstersIDs`] = table.monstersIDs
      .filter((value) => value !== filter)

    filter = table.monstersList[monsterIndex]
    payload[`monstersList`] = table.monstersList
      .filter((value) => value.id !== filter.id)

    filter = table.monstersData[monsterIndex]
    payload[`monstersData`] = table.monstersData
      .filter((value) => value.id !== filter.id)

    this.store.dispatch(
      `updateTablesListMonsters`,
      {
        index: tableIndex,
        monstersIDs: [...payload.monstersIDs],
        monstersData: [...payload.monstersData],
      }
    )

    this.store.dispatch(
      `updateTableMonsters`,
      {
        monstersIDs: [...payload.monstersIDs],
        monstersList: [...payload.monstersList],
        monstersData: [...payload.monstersData],
      }
    )

    return true
  }

  async commitMessage (payload) {
    console.log(`commitMessage`)
    await this.store.dispatch(
      `commitMessage`,
      {
        table: payload.table,
        username: payload.username,
        senderID: payload.senderID,
        senderName: payload.senderName,
        type: payload.type,
        text: JSON.parse(payload.text),
        action: JSON.parse(payload.action),
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
