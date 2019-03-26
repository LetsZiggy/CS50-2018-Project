import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'
import { Store, connectTo } from 'aurelia-store'
import { pluck, distinctUntilChanged } from 'rxjs/operators'

import { HTTP } from '../http'
import { Actions } from '../actions'
import { lobbyForm } from './lobby-form'
import { tableDefault } from './table-form'
import { characterDefault } from './character-form'
import { monsterDefault } from './monster-form'

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
    currentLobby: (store) => store.state.pipe(
      pluck(`present`, `lobby`, `currentLobby`),
      distinctUntilChanged()
    ),
    filterTables: (store) => store.state.pipe(
      pluck(`present`, `lobby`, `filterTables`),
      distinctUntilChanged()
    ),
    filterMonsters: (store) => store.state.pipe(
      pluck(`present`, `lobby`, `filterMonsters`),
      distinctUntilChanged()
    ),
    tablesList: (store) => store.state.pipe(
      pluck(`present`, `lobby`, `tablesList`),
      distinctUntilChanged()
    ),
    charactersList: (store) => store.state.pipe(
      pluck(`present`, `lobby`, `charactersList`),
      distinctUntilChanged()
    ),
    monstersList: (store) => store.state.pipe(
      pluck(`present`, `lobby`, `monstersList`),
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
    this.store.registerAction(`setCurrentLobby`, Actions.setCurrentLobby)
    this.store.registerAction(`setFilterTables`, Actions.setFilterTables)
    this.store.registerAction(`setFilterMonsters`, Actions.setFilterMonsters)
    this.store.registerAction(`appendTablesList`, Actions.appendTablesList)
    this.store.registerAction(`appendCharactersList`, Actions.appendCharactersList)
    this.store.registerAction(`appendMonstersList`, Actions.appendMonstersList)
    this.store.registerAction(`updateTablesListCharacters`, Actions.updateTablesListCharacters)
    this.store.registerAction(`setTableData`, Actions.setTableData)
    this.store.registerAction(`setCharacterData`, Actions.setCharacterData)
    this.store.registerAction(`setMonsterData`, Actions.setMonsterData)
    this.store.registerAction(`deleteTable`, Actions.deleteTable)
    this.store.registerAction(`deleteCharacter`, Actions.deleteCharacter)
    this.store.registerAction(`deleteMonster`, Actions.deleteMonster)

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
    this.store.unregisterAction(`setCurrentLobby`, Actions.setCurrentLobby)
    this.store.unregisterAction(`setFilterTables`, Actions.setFilterTables)
    this.store.unregisterAction(`setFilterMonsters`, Actions.setFilterMonsters)
    this.store.unregisterAction(`appendTablesList`, Actions.appendTablesList)
    this.store.unregisterAction(`appendCharactersList`, Actions.appendCharactersList)
    this.store.unregisterAction(`appendMonstersList`, Actions.appendMonstersList)
    this.store.unregisterAction(`updateTablesListCharacters`, Actions.updateTablesListCharacters)
    this.store.unregisterAction(`setTableData`, Actions.setTableData)
    this.store.unregisterAction(`setCharacterData`, Actions.setCharacterData)
    this.store.unregisterAction(`setMonsterData`, Actions.setMonsterData)
    this.store.unregisterAction(`deleteTable`, Actions.deleteTable)
    this.store.unregisterAction(`deleteCharacter`, Actions.deleteCharacter)
    this.store.unregisterAction(`deleteMonster`, Actions.deleteMonster)
  }

  // Get tables | characters | monsters
  async getData () {
    // const tablesLastID = (this.state.tablesList.length)
    //   ? this.state.tablesList.reduce((acc, value) => (Number(value.id) > acc)
    //     ? Number(value.id)
    //     : acc, 0)
    //   : 0

    // const charactersLastID = (this.state.charactersList.length)
    //   ? this.state.charactersList.reduce((acc, value) => (Number(value.id) > acc)
    //     ? Number(value.id)
    //     : acc, 0)
    //   : 0

    // const monstersLastID = (this.state.monstersList.length)
    //   ? this.state.monstersList.reduce((acc, value) => (Number(value.id) > acc)
    //     ? Number(value.id)
    //     : acc, 0)
    //   : 0

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/lobby/getAll`,
      {
        token: this.state.token,
        // tablesLastID: tablesLastID,
        // charactersLastID: charactersLastID,
        // monstersLastID: monstersLastID,
      }
    )

    if (result.success) {
      this.store.dispatch(
        `appendTablesList`,
        {
          tablesList: result.payload.tablesList,
        }
      )

      this.store.dispatch(
        `appendCharactersList`,
        {
          charactersList: result.payload.charactersList,
        }
      )

      this.store.dispatch(
        `appendMonstersList`,
        {
          monstersList: result.payload.monstersList,
        }
      )
    }
    else {
      console.log(`server-error: getAll`)

      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`entrance`)
    }
  }

  // Set current tab
  async setCurrentTab (type) {
    Array.from(document.getElementById(`tables-window`).lastElementChild.children).forEach((value) => {
      const children = Array.from(value.children)

      if (children[2].textContent === `Join`) {
        children[1].classList.remove(`hidden`)
        children[2].classList.remove(`hidden`)
        children[3].classList.add(`hidden`)
        children[4].classList.add(`hidden`)
        children[5].classList.add(`hidden`)
      }
    })

    await this.store.dispatch(
      `setCurrentLobby`,
      {
        currentLobby: `show-${type}`,
      }
    )

    return true
  }

  // Set filter tables
  async filterTables (type) {
    await this.store.dispatch(
      `setFilterTables`,
      {
        filterTables: `hide-${type}`,
      }
    )

    return true
  }

  // Set filter monsters
  async filterMonsters (element) {
    await this.store.dispatch(
      `setFilterMonsters`,
      {
        filterMonsters: Number(document.getElementById(element).value),
      }
    )

    Array.from(document.getElementsByClassName(`monster-item`)).forEach((value) => {
      if (this.state.filterMonsters === -1) {
        value.classList.remove(`hidden`)
      }
      else if (Number(value.dataset.challengeRating) === this.state.filterMonsters) {
        value.classList.remove(`hidden`)
      }
      else {
        value.classList.add(`hidden`)
      }
    })

    return true
  }

  // Create new table
  async createTable () {
    // Get new table id
    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/lobby/create`,
      {
        token: this.state.token,
        modelType: `table`,
      }
    )

    if (result.success) {
      this.store.dispatch(
        `appendTablesList`,
        {
          tablesList: [
            {
              ...tableDefault,
              id: result.payload.id,
              owner: this.state.username,
            }
          ]
        }
      )

      this.store.dispatch(
        `setTableData`,
        {
          value: {
            ...tableDefault,
            id: result.payload.id,
            owner: this.state.username,
          },
        }
      )

      this.route({ route: `table`, id: result.payload.id, action: `new` })
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

  // Create new character
  async createCharacter (data) {
    // Get new character id
    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/lobby/create`,
      {
        token: this.state.token,
        modelType: `character`,
      }
    )

    if (result.success) {
      this.store.dispatch(
        `appendCharactersList`,
        {
          charactersList: [
            {
              ...characterDefault,
              id: result.payload.id,
              owner: this.state.username,
            }
          ]
        }
      )

      this.store.dispatch(
        `setCharacterData`,
        {
          value: {
            ...characterDefault,
            id: result.payload.id,
            owner: this.state.username,
          },
        }
      )

      this.route({ route: `character`, id: result.payload.id, action: `new` })
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

  // Create new monster
  async createMonster (data) {
    // Get new monster id
    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/lobby/create`,
      {
        token: this.state.token,
        modelType: `monster`,
      }
    )

    if (result.success) {
      this.store.dispatch(
        `appendMonstersList`,
        {
          monstersList: [
            {
              ...monsterDefault,
              id: result.payload.id,
              owner: this.state.username,
            }
          ]
        }
      )

      this.store.dispatch(
        `setMonsterData`,
        {
          value: {
            ...monsterDefault,
            id: result.payload.id,
            owner: this.state.username,
          },
        }
      )

      this.route({ route: `monster`, id: result.payload.id, action: `new` })
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

  showSelection (data) {
    const children = Array.from(document.getElementById(`table-${data.id}`).children)

    if (data.set === `select`) {
      children[1].classList.add(`hidden`)
      children[2].classList.add(`hidden`)
      children[3].classList.remove(`hidden`)
      children[4].classList.remove(`hidden`)
      children[5].classList.remove(`hidden`)
    }
    else {
      children[1].classList.remove(`hidden`)
      children[2].classList.remove(`hidden`)
      children[3].classList.add(`hidden`)
      children[4].classList.add(`hidden`)
      children[5].classList.add(`hidden`)
    }

    return true
  }

  enableConfirm (id) {
    const children = Array.from(document.getElementById(`table-${id}`).children)
    const select = children[3].children[1]

    children[5].disabled = (select.selectedIndex === 0)
      ? true
      : false

    return true
  }

  // Route to item page
  async route (data) {
    // Check if player joining in
    if (data.route === `table` && data.action !== `new`) {
      data.table = this.state.tablesList[data.index]
      data.action =
        (data.table.owner !== this.state.username && !data.table.players.includes(this.state.username))
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
    else if (data.route !== `table` || data.action === `play`) {
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
        (data.table.passcode.length)
          ? (document.getElementById(`passcode-${data.index}`).value !== data.table.passcode)
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
        const children = Array.from(document.getElementById(`table-${data.id}`).children)
        const select = children[3].children[1]

        data.players = [
          ...this.state.tablesList[data.index].players,
          this.state.username
        ]

        data.charactersIDs = [
          ...this.state.tablesList[data.index].charactersIDs,
          Number(select[select.selectedIndex].value)
        ]

        data.charactersData = [
          ...this.state.tablesList[data.index].charactersData,
          {
            id: Number(select[select.selectedIndex].value),
            statusEffect: [],
            hpCurr: this.state.charactersList[data.index].hpMax,
            savingThrowDeathSuccess: 0,
            savingThrowDeathFailure: 0,
          }
        ]

        await this.store.dispatch(`setToken`, await this.http.get(`/token`))
        const result = await this.http.post(
          `/table/updateTablesListCharacters`,
          {
            token: this.state.token,
            assetid: data.id,
            players: data.players.join(`;`),
            charactersIDs: data.charactersIDs.join(`;`),
            charactersList: [this.state.charactersList[data.index]],
            charactersData: JSON.stringify(data.charactersData),
            websocketType: `characterAdd`,
          }
        )

        if (result.success) {
          this.store.dispatch(
            `updateTablesListCharacters`,
            {
              index: data.index,
              players: [...data.players],
              charactersIDs: [...data.charactersIDs],
              charactersData: [...data.charactersData],
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
