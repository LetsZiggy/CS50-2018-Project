import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'
import { Store, connectTo } from 'aurelia-store'
import { pluck, distinctUntilChanged } from 'rxjs/operators'

import { HTTP } from '../http'
import { WS } from '../ws'
import { Actions } from '../actions'
import { deepGet, deepAssign, calculateDependants, calculateDie } from './form-functions'
import { tableForm, tableDefault, tableBooleanKeys, tableArrayKeys, tableJSONKeys } from './table-form'

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
    table: (store) => store.state.pipe(
      pluck(`present`, `table`),
      distinctUntilChanged()
    ),
  },
})
@inject(Router, Store, HTTP, WS)
export class Table {
  constructor (Router, Store, HTTP, WS) {
    this.router = Router
    this.store = Store
    this.http = HTTP
    this.ws = WS
    this.form = { ...tableForm }
    this.storage = {
      websocket: null,
      prevVal: null,
      lastFocus: null,
      lastStatistic: null,
      cursorPosition: null,
      error: null,
      changes: [],
      interval: null,
      table: { message: `` },
    }
  }

  // propertyChanged (stateName, newState, oldState) {
  //   switch (stateName) {
  //     case `table`:
  //       this.storage[`table`] = newState
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

    if (username === `` || assetid === `` || params.assetid !== assetid || assettype !== `table`) {
      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`lobby`, { username: username })
    }

    this.storage[`username`] = username
    this.storage[`params`] = params
  }

  async bind (bindingContext, overrideContext) {
    this.store.registerAction(`setToken`, Actions.setToken)
    this.store.registerAction(`setUsername`, Actions.setUsername)
    this.store.registerAction(`setTableData`, Actions.setTableData)
    this.store.registerAction(`updateTableAssetsData`, Actions.updateTableAssetsData)
    this.store.registerAction(`appendTablesList`, Actions.appendTablesList)
    this.store.registerAction(`updateTableAssets`, Actions.updateTableAssets)
    this.store.registerAction(`updateTableCharacters`, Actions.updateTableCharacters)
    this.store.registerAction(`updateTablesListMonsters`, Actions.updateTablesListMonsters)
    this.store.registerAction(`updateTablesListCharacters`, Actions.updateTablesListCharacters)
    this.store.registerAction(`updateTableData`, Actions.updateTableData)
    this.store.registerAction(`updateTableMonsters`, Actions.updateTableMonsters)
    this.store.registerAction(`updateTableCharacter`, Actions.updateTableCharacter)
    this.store.registerAction(`commitMessage`, Actions.commitMessage)

    // Add username to state if enter table directly with valid cookies
    if (!this.state.username) {
      this.store.dispatch(
        `setUsername`,
        {
          username: this.storage.username,
        }
      )
    }

    // Get table data
    await this.getData()

    // Get index of table
    const table = this.state.tablesList
      .map((value, index) => ({ id: value.id, index: index }))
      .filter((value) => value.id === Number(this.storage.params.assetid))

    const index = (table.length) ? table[0].index : null

    if (index === null) {
      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`lobby`, { username: this.storage.username })
    }

    await this.store.dispatch(
      `setTableData`,
      {
        default: tableDefault,
        index: index,
      }
    )

    // Get all table characters
    let charactersList = []
    let charactersIDs = this.state.table.charactersIDs
      .reduce((acc, value, index) => {
        acc = (index === 0)
          ? `${value}`
          : `${acc}, ${value}`

        return acc
      }, ``)

    // Get all table monsters
    let monstersList = []
    let monstersIDs = this.state.table.monstersIDs
      .reduce((acc, value, index) => {
        acc = (!acc.length)
          ? `${value}`
          : `${acc}, ${value}`

        return acc
      }, ``)

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/table/getCurrentTableData`,
      {
        token: this.state.token,
        tableID: this.state.table.id,
        charactersIDs: (charactersIDs.length) ? charactersIDs : null,
        monstersIDs: (monstersIDs.length) ? monstersIDs : null,
      }
    )

    if (result.success) {
      let ids = null

      // Prepare charactersList by sorting charactersList to order of players joining table
      ids = result.payload.characters
        .map((value) => value.id)

      result.payload.characters = this.state.table.charactersIDs
        .map((value) => result.payload.characters[ids.indexOf(Number(value))])

      // Prepare monstersList by sorting monstersList to order added by DM
      ids = result.payload.monsters
        .map((value) => value.id)

      result.payload.monsters = this.state.table.monstersIDs
        .map((value) => result.payload.monsters[ids.indexOf(Number(value))])

      await this.store.dispatch(
        `updateTableAssets`,
        {
          charactersIDs: this.state.table.charactersIDs,
          charactersList: result.payload.characters,
          monstersIDs: this.state.table.monstersIDs,
          monstersList: result.payload.monsters,
          messages: result.payload.messages,
        }
      )

      setTimeout(() => {
        if (document.getElementsByClassName(`message`).length) {
          const messages = document.getElementsByClassName(`message`)
          messages[messages.length - 1].scrollIntoView()
        }
      }, 0)
    }

    // Default monster index to 0 if DM
    if (this.state.table.owner === this.state.username) {
      this.storage.table[`monsterIndex`] = (this.state.table.monstersIDs.length)
        ? 0
        : null

      this.storage.table[`monsterID`] = (this.state.table.monstersIDs.length)
        ? this.state.table.monstersList[this.storage.table.monsterIndex].id
        : null

      this.storage.table = {
        ...this.storage.table,
        ...this.state.table.monstersList[this.storage.table.monsterIndex],
        ...this.state.table.monstersData[this.storage.table.monsterIndex],
        name: this.state.table.name,
        passcode: this.state.table.passcode,
        maxPlayers: Number(this.state.table.maxPlayers),
        published: this.state.table.published,
      }
    }

    // Get character index if player
    if (this.state.table.players.includes(this.state.username)) {
      this.storage.table[`characterIndex`] = this.state.table.players.indexOf(this.state.username)
      this.storage.table[`characterID`] = this.state.table.charactersList[this.storage.table.characterIndex].id

      const characterInfo = this.state.table.charactersList[this.storage.table.characterIndex].characterInfo
        .split(`\n`)
        .reduce((acc, value) => {
          if (value.length) {
            acc.push(value)
          }

          return acc
        }, [])

      const characterClass = this.form.character.classes[
          this.form.character.classes
            .map((value) => value[0])
            .indexOf(this.state.table.charactersList[this.storage.table.characterIndex].class)
        ][1].replace(/\s\(PHB\)/g, ``)

      const weaponProficiencyList = this.form.character.weaponProficiencies
        .reduce((acc, value) =>
          (this.state.table.charactersList[this.storage.table.characterIndex].weaponProficiencyList.includes(value[0]))
          ? [ ...acc, value[1] ]
          : acc, [])

      const armorProficiencyList = this.form.character.armorProficiencies
        .reduce((acc, value) =>
          (this.state.table.charactersList[this.storage.table.characterIndex].armorProficiencyList.includes(value[0]))
          ? [ ...acc, value[1] ]
          : acc, [])

      const toolProficiencyList = this.form.character.toolProficiencies
        .reduce((acc, value) =>
          (this.state.table.charactersList[this.storage.table.characterIndex].toolProficiencyList.includes(value[0]))
          ? [ ...acc, value[1] ]
          : acc, [])

      const languageProficiencyList = this.form.character.languageProficiencies
        .reduce((acc, value) =>
          (this.state.table.charactersList[this.storage.table.characterIndex].languageProficiencyList.includes(value[0]))
          ? [ ...acc, value[1] ]
          : acc, [])

      const equippedWeaponList =
        (!this.state.table.charactersList[this.storage.table.characterIndex].equippedWeaponList.length)
          ? []
          : this.state.table.charactersList[this.storage.table.characterIndex].equippedWeaponList
              .map((weapon) =>
                this.state.table.charactersList[this.storage.table.characterIndex].itemList
                  .reduce((acc, value) =>
                    (value.includes(weapon))
                      ? value
                          .replace(/^\n+|\n+$/g, ``)
                          .replace(/-end::\n\n/g, `-end::`)
                          .split(`-end::`)
                          .reduce((acc, reduceValue) =>
                            (reduceValue.length)
                              ? [ ...acc, `${reduceValue}-end::` ]
                              : acc
                          , [])
                          .reduce((acc, reduceValue) => {
                            if (reduceValue.includes(`::title-start::`)) {
                              reduceValue = reduceValue
                                .split(`::title-start::`)[1]
                                .split(`::title-end::`)[0]

                              reduceValue = reduceValue
                                .replace(/<itemTypes\.(?:(?:meleeOne|meleeTwo|rangedOne|rangedTwo)HandedWeapon|staff|wand|rod)>/g, ``)
                                .replace(/^\s+|\s+$/g, ``)

                              acc.push(reduceValue)
                            }
                            else if (reduceValue.includes(`::description-start::`)) {
                              reduceValue = reduceValue
                                .split(`::description-start::`)[1]
                                .split(`::description-end::`)[0]
                                .replace(/^\s+|\s+$/g, ``)

                              acc.push(reduceValue)
                            }
                            else if (reduceValue.includes(`::property-start::`)) {
                              reduceValue = reduceValue
                                .split(`::property-start::`)[1]
                                .split(`::property-end::`)[0]
                                .replace(/^\s+|\s+$/g, ``)

                              acc.push(reduceValue)
                            }

                            return acc
                          }, [])
                          .reduce((acc, reduceValue, reduceIndex) => {
                            if (reduceIndex === 0) {
                              acc = {
                                ...acc,
                                title: reduceValue,
                              }
                            }
                            else if (reduceIndex === 1) {
                              acc = {
                                ...acc,
                                description: reduceValue.split(`\n`),
                              }
                            }
                            else if (reduceIndex === 2) {
                              acc = {
                                ...acc,
                                property: reduceValue.split(`\n`),
                              }
                            }

                            return acc
                          }, {})
                      : acc
                    , ``)
              )

      const equippedAccessoryList =
        (!this.state.table.charactersList[this.storage.table.characterIndex].equippedAccessoryList.length)
          ? []
          : this.state.table.charactersList[this.storage.table.characterIndex].equippedAccessoryList
              .map((accessory) =>
                this.state.table.charactersList[this.storage.table.characterIndex].itemList
                  .reduce((acc, value) =>
                    (value.includes(accessory))
                      ? value
                          .replace(/^\n+|\n+$/g, ``)
                          .replace(/-end::\n\n/g, `-end::`)
                          .split(`-end::`)
                          .reduce((acc, reduceValue) =>
                            (reduceValue.length)
                              ? [ ...acc, `${reduceValue}-end::`]
                              : acc
                          , [])
                          .reduce((acc, reduceValue) => {
                            if (reduceValue.includes(`::title-start::`)) {
                              reduceValue = reduceValue
                                .split(`::title-start::`)[1]
                                .split(`::title-end::`)[0]

                              reduceValue = reduceValue
                                .replace(/<itemTypes\.(?:ring)>/g, ``)
                                .replace(/^\s+|\s+$/g, ``)

                              acc.push(reduceValue)
                            }
                            else if (reduceValue.includes(`::description-start::`)) {
                              reduceValue = reduceValue
                                .split(`::description-start::`)[1]
                                .split(`::description-end::`)[0]
                                .replace(/^\s+|\s+$/g, ``)

                              acc.push(reduceValue)
                            }
                            else if (reduceValue.includes(`::property-start::`)) {
                              reduceValue = reduceValue
                                .split(`::property-start::`)[1]
                                .split(`::property-end::`)[0]
                                .replace(/^\s+|\s+$/g, ``)

                              acc.push(reduceValue)
                            }

                            return acc
                          }, [])
                          .reduce((acc, reduceValue, reduceIndex) => {
                            if (reduceIndex === 0) {
                              acc = {
                                ...acc,
                                title: reduceValue,
                              }
                            }
                            else if (reduceIndex === 1) {
                              acc = {
                                ...acc,
                                description: reduceValue.split(`\n`),
                              }
                            }
                            else if (reduceIndex === 2) {
                              acc = {
                                ...acc,
                                property: reduceValue.split(`\n`),
                              }
                            }

                            return acc
                          }, {})
                      : acc
                    , ``)
              )

      const equippedArmor = this.state.table.charactersList[this.storage.table.characterIndex].itemList
        .reduce((acc, value) =>
          (this.state.table.charactersList[this.storage.table.characterIndex].equippedArmor.length && value.includes(this.state.table.charactersList[this.storage.table.characterIndex].equippedArmor))
            ? value
                .replace(/^\n+|\n+$/g, ``)
                .replace(/-end::\n\n/g, `-end::`)
                .split(`-end::`)
                .reduce((acc, reduceValue) =>
                  (reduceValue.length)
                    ? [ ...acc, `${reduceValue}-end::` ]
                    : acc
                , [])
                .reduce((acc, reduceValue) => {
                  if (reduceValue.includes(`::title-start::`)) {
                    reduceValue = reduceValue
                      .split(`::title-start::`)[1]
                      .split(`::title-end::`)[0]

                    reduceValue = reduceValue
                      .replace(/<itemTypes\.(?:(?:light|medium|heavy)Armor)>/g, ``)
                      .replace(/^\s+|\s+$/g, ``)

                    acc.push(reduceValue)
                  }
                  else if (reduceValue.includes(`::description-start::`)) {
                    reduceValue = reduceValue
                      .split(`::description-start::`)[1]
                      .split(`::description-end::`)[0]
                      .replace(/^\s+|\s+$/g, ``)

                    acc.push(reduceValue)
                  }
                  else if (reduceValue.includes(`::property-start::`)) {
                    reduceValue = reduceValue
                      .split(`::property-start::`)[1]
                      .split(`::property-end::`)[0]
                      .replace(/^\s+|\s+$/g, ``)

                    acc.push(reduceValue)
                  }

                  return acc
                }, [])
                .reduce((acc, reduceValue, reduceIndex) => {
                  if (reduceIndex === 0) {
                    acc = {
                      ...acc,
                      title: reduceValue,
                    }
                  }
                  else if (reduceIndex === 1) {
                    acc = {
                      ...acc,
                      description: reduceValue.split(`\n`),
                    }
                  }
                  else if (reduceIndex === 2) {
                    acc = {
                      ...acc,
                      property: reduceValue.split(`\n`),
                    }
                  }

                  return acc
                }, {})
            : acc
          , ``)

      const equippedShield = this.state.table.charactersList[this.storage.table.characterIndex].itemList
        .reduce((acc, value) =>
          (this.state.table.charactersList[this.storage.table.characterIndex].equippedShield.length && value.includes(this.state.table.charactersList[this.storage.table.characterIndex].equippedShield))
            ? value
                .replace(/^\n+|\n+$/g, ``)
                .replace(/-end::\n\n/g, `-end::`)
                .split(`-end::`)
                .reduce((acc, reduceValue) =>
                  (reduceValue.length)
                    ? [ ...acc, `${reduceValue}-end::` ]
                    : acc
                , [])
                .reduce((acc, reduceValue) => {
                  if (reduceValue.includes(`::title-start::`)) {
                    reduceValue = reduceValue
                      .split(`::title-start::`)[1]
                      .split(`::title-end::`)[0]

                    reduceValue = reduceValue
                      .replace(/<itemTypes\.(?:shield)>/g, ``)
                      .replace(/^\s+|\s+$/g, ``)

                    acc.push(reduceValue)
                  }
                  else if (reduceValue.includes(`::description-start::`)) {
                    reduceValue = reduceValue
                      .split(`::description-start::`)[1]
                      .split(`::description-end::`)[0]
                      .replace(/^\s+|\s+$/g, ``)

                    acc.push(reduceValue)
                  }
                  else if (reduceValue.includes(`::property-start::`)) {
                    reduceValue = reduceValue
                      .split(`::property-start::`)[1]
                      .split(`::property-end::`)[0]
                      .replace(/^\s+|\s+$/g, ``)

                    acc.push(reduceValue)
                  }

                  return acc
                }, [])
                .reduce((acc, reduceValue, reduceIndex) => {
                  if (reduceIndex === 0) {
                    acc = {
                      ...acc,
                      title: reduceValue,
                    }
                  }
                  else if (reduceIndex === 1) {
                    acc = {
                      ...acc,
                      description: reduceValue.split(`\n`),
                    }
                  }
                  else if (reduceIndex === 2) {
                    acc = {
                      ...acc,
                      property: reduceValue.split(`\n`),
                    }
                  }

                  return acc
                }, {})
            : acc
          , ``)

      const itemList = this.state.table.charactersList[this.storage.table.characterIndex].itemList
        .reduce((acc, value) =>
          (!this.state.table.charactersList[this.storage.table.characterIndex].equippedArmor.length || !value.includes(this.state.table.charactersList[this.storage.table.characterIndex].equippedArmor))
            ? [ ...acc, value ]
            : acc
        , [])
        .reduce((acc, value) =>
          (!this.state.table.charactersList[this.storage.table.characterIndex].equippedShield.length || !value.includes(this.state.table.charactersList[this.storage.table.characterIndex].equippedShield))
            ? [ ...acc, value ]
            : acc
        , [])
        .reduce((acc, value) => {
          if (this.state.table.charactersList[this.storage.table.characterIndex].equippedWeaponList.length) {
            this.state.table.charactersList[this.storage.table.characterIndex].equippedWeaponList
              .forEach((foreachValue) => {
                if (!value.includes(foreachValue)) {
                  acc = [ ...acc, value ]
                }
              })
          }
          else {
            acc = [ ...acc, value ]
          }

          return acc
        }, [])
        .reduce((acc, value) => {
          if (this.state.table.charactersList[this.storage.table.characterIndex].equippedAccessoryList.length) {
            this.state.table.charactersList[this.storage.table.characterIndex].equippedAccessoryList
              .forEach((foreachValue) => {
                if (!value.includes(foreachValue)) {
                  acc = [ ...acc, value ]
                }
              })
          }
          else {
            acc = [ ...acc, value ]
          }

          return acc
        }, [])
        .map((value) => value
          .replace(/^\n+|\n+$/g, ``)
          .replace(/-end::\n\n/g, `-end::`)
          .split(`-end::`)
          .reduce((acc, reduceValue) =>
            (reduceValue.length)
              ? [ ...acc, `${reduceValue}-end::`]
              : acc
          , [])
          .reduce((acc, reduceValue) => {
            if (reduceValue.includes(`::title-start::`)) {
              reduceValue = reduceValue
                .split(`::title-start::`)[1]
                .split(`::title-end::`)[0]

              reduceValue = reduceValue
                .replace(/<itemTypes\.(?:(?:meleeOne|meleeTwo|rangedOne|rangedTwo)HandedWeapon|staff|wand|rod|(?:light|medium|heavy)Armor|ring|shield)>/g, ``)
                .replace(/^\s+|\s+$/g, ``)

              acc.push(reduceValue)
            }
            else if (reduceValue.includes(`::description-start::`)) {
              reduceValue = reduceValue
                .split(`::description-start::`)[1]
                .split(`::description-end::`)[0]
                .replace(/^\s+|\s+$/g, ``)

              acc.push(reduceValue)
            }
            else if (reduceValue.includes(`::property-start::`)) {
              reduceValue = reduceValue
                .split(`::property-start::`)[1]
                .split(`::property-end::`)[0]
                .replace(/^\s+|\s+$/g, ``)

              acc.push(reduceValue)
            }

            return acc
          }, [])
          .reduce((acc, reduceValue, reduceIndex) => {
            if (reduceIndex === 0) {
              acc = {
                ...acc,
                title: reduceValue,
              }
            }
            else if (reduceIndex === 1) {
              acc = {
                ...acc,
                description: reduceValue.split(`\n`),
              }
            }
            else if (reduceIndex === 2) {
              acc = {
                ...acc,
                property: reduceValue.split(`\n`),
              }
            }

            return acc
          }, {})
        )
        .reduce((acc, value) => {
          let index = (acc.length) ? (acc.length - 1) : 0

          if ((acc.length === 0) || (acc[index].length === 2)) {
            acc.push([ value ])
          }
          else {
            acc[index].push(value)
          }

          return acc
        }, [])

      const actionList = this.state.table.charactersList[this.storage.table.characterIndex].actionList
        .map((value) => value
          .replace(/^\n+|\n+$/g, ``)
          .replace(/-end::\n\n/g, `-end::`)
          .split(`-end::`)
          .reduce((acc, reduceValue) =>
            (reduceValue.length)
              ? [ ...acc, `${reduceValue}-end::` ]
              : acc
          , [])
          .reduce((acc, reduceValue) => {
            if (reduceValue.includes(`::title-start::`)) {
              reduceValue = reduceValue
                .split(`::title-start::`)[1]
                .split(`::title-end::`)[0]
                .replace(/^\s+|\s+$/g, ``)

              acc.push(reduceValue)
            }
            else if (reduceValue.includes(`::description-start::`)) {
              reduceValue = reduceValue
                .split(`::description-start::`)[1]
                .split(`::description-end::`)[0]
                .replace(/^\s+|\s+$/g, ``)

              acc.push(reduceValue)
            }
            else if (reduceValue.includes(`::hit-start::`)) {
              reduceValue = reduceValue
                .split(`::hit-start::`)[1]
                .split(`::hit-end::`)[0]
                .replace(/^\s+|\s+$/g, ``)

              acc.push(reduceValue)
            }
            else if (reduceValue.includes(`::damage-start::`)) {
              reduceValue = reduceValue
                .split(`::damage-start::`)[1]
                .split(`::damage-end::`)[0]
                .replace(/^\s+|\s+$/g, ``)

              acc.push(reduceValue)
            }

            return acc
          }, [])
          .reduce((acc, reduceValue, reduceIndex) => {
            if (reduceIndex === 0) {
              acc = {
                ...acc,
                title: reduceValue,
              }
            }
            else if (reduceIndex === 1) {
              acc = {
                ...acc,
                description: reduceValue.split(`\n`),
              }
            }
            else if (reduceIndex === 2) {
              acc = {
                ...acc,
                hit: reduceValue.split(`\n`),
              }
            }
            else if (reduceIndex === 3) {
              acc = {
                ...acc,
                damage: reduceValue.split(`\n`),
              }
            }

            return acc
          }, {})
        )
        .reduce((acc, value) => {
          let index = (acc.length) ? (acc.length - 1) : 0

          if ((acc.length === 0) || (acc[index].length === 2)) {
            acc.push([ value ])
          }
          else {
            acc[index].push(value)
          }

          return acc
        }, [])

      console.log(`actionList`, actionList)

      this.storage.table = {
        ...this.storage.table,
        ...this.state.table.charactersList[this.storage.table.characterIndex],
        ...this.state.table.charactersData[this.storage.table.characterIndex],
        characterInfo: [ ...characterInfo ],
        class: characterClass,
        weaponProficiencyList: [ ...weaponProficiencyList ],
        armorProficiencyList: [ ...armorProficiencyList ],
        toolProficiencyList: [ ...toolProficiencyList ],
        languageProficiencyList: [ ...languageProficiencyList ],
        equippedWeaponList: [ ...equippedWeaponList ],
        equippedAccessoryList: [ ...equippedAccessoryList ],
        equippedArmor: equippedArmor,
        equippedShield: equippedShield,
        itemList: itemList,
      }
    }

    // Set websocket
    this.setWebsocket()
  }

  async attached () {
    // Ready page
    setTimeout(async () => {
      this.storage.lastFocus = document.getElementById(`message-input`)
      this.storage.prevVal = document.getElementById(`message-input`).value
    }, 50)
  }

  unbind () {
    if (this.storage.websocket && this.storage.websocket.readyState === 1) {
      this.storage.websocket.send(
        JSON.stringify({
          type: `tableExit`,
          payload: {},
        })
      )
    }

    this.store.unregisterAction(`setToken`, Actions.setToken)
    this.store.unregisterAction(`setUsername`, Actions.setUsername)
    this.store.unregisterAction(`setTableData`, Actions.setTableData)
    this.store.unregisterAction(`updateTableAssetsData`, Actions.updateTableAssetsData)
    this.store.unregisterAction(`appendTablesList`, Actions.appendTablesList)
    this.store.unregisterAction(`updateTableAssets`, Actions.updateTableAssets)
    this.store.unregisterAction(`updateTableCharacters`, Actions.updateTableCharacters)
    this.store.unregisterAction(`updateTablesListMonsters`, Actions.updateTablesListMonsters)
    this.store.unregisterAction(`updateTablesListCharacters`, Actions.updateTablesListCharacters)
    this.store.unregisterAction(`updateTableData`, Actions.updateTableData)
    this.store.unregisterAction(`updateTableMonsters`, Actions.updateTableMonsters)
    this.store.unregisterAction(`updateTableCharacter`, Actions.updateTableCharacter)
    this.store.unregisterAction(`commitMessage`, Actions.commitMessage)
  }

  // Get tableData
  async getData () {
    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/table/getOne`,
      {
        token: this.state.token,
        id: Number(this.storage.params.assetid),
      }
    )

    if (result.success) {
      await this.store.dispatch(
        `appendTablesList`,
        {
          tablesList: result.payload.tablesList,
        }
      )
    }
    else {
      console.log(`server-error: tableData`)

      // https://stackoverflow.com/a/36973396
      this.router.navigateToRoute(`lobby`, { username: this.storage.username })
    }
  }

  // Connect to websocket server
  setWebsocket () {
    if (!this.storage.websocket || this.storage.websocket.readyState === 3) {
      this.storage.websocket = new WebSocket(`ws://localhost:3000`)
      // this.storage.websocket = new WebSocket(`wss://localhost:3000`)

      this.storage.websocket.onopen = (event) => {
        this.storage.websocket.send(
          JSON.stringify({
            type: `tableEnter`,
            payload: {
              username: this.state.username,
              table: this.state.table.id,
            },
          })
        )

        console.log('ws:opened')
      }

      this.storage.websocket.onclose = (event) => {
        this.storage.websocket = null
        console.log('ws:closed')
      }

      this.storage.websocket.onerror = (event) => {
        this.storage.websocket = null
        console.log('ws:errored')
      }

      this.storage.websocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.ws.parseWebsocket(data, this.state)
      }
    }
  }

  setCurrentTab (id) {
    if (id === `dm-battle`) {
      this.storage.lastFocus = document.getElementById(`message-input`)
      this.storage.prevVal = document.getElementById(`message-input`).value
      this.storage.table = {
        ...this.storage.table,
        ...this.state.table.monstersList[this.storage.table.monsterIndex],
        ...this.state.table.monstersData[this.storage.table.monsterIndex],
      }
    }
    else if (id === `dm-table`) {
      this.storage.table[`name`] = this.state.table.name
      this.storage.table[`passcode`] = this.state.table.passcode
      this.storage.table[`maxPlayers`] = Number(this.state.table.maxPlayers)
      this.storage.table[`published`] = this.state.table.published

      setTimeout(() => {
        document.getElementById(`table-name-input`).focus()
      }, 0)
    }

    if (id === `player-battle`) {
      this.storage.lastFocus = document.getElementById(`message-input`)
      this.storage.prevVal = document.getElementById(`message-input`).value

      const characterClass = this.storage.table.class
      const characterInfo = this.storage.table.characterInfo

      this.storage.table = {
        ...this.storage.table,
        ...this.state.table.charactersList[this.storage.table.characterIndex],
        ...this.state.table.charactersData[this.storage.table.characterIndex],
        class: characterClass,
        characterInfo: [ ...characterInfo ],
      }
    }
    else if (id === `player-character`) {
      this.storage.lastFocus = document.getElementById(`character-notes-input`)
      this.storage.prevVal = document.getElementById(`character-notes-input`).value

      const characterClass = this.storage.table.class
      const characterInfo = this.storage.table.characterInfo

      this.storage.table = {
        ...this.storage.table,
        ...this.state.table.charactersList[this.storage.table.characterIndex],
        ...this.state.table.charactersData[this.storage.table.characterIndex],
        class: characterClass,
        characterInfo: [ ...characterInfo ],
      }

      setTimeout(() => {
        document.getElementById(`character-coin-copper-input`).focus()
      }, 0)
    }

    return true
  }

  storeCurrentValue (id) {
    this.storage.prevVal = document.getElementById(id).value
    return true
  }

  // Store last textarea in focus
  async blurTextarea (data) {
    this.storage.lastFocus = document.getElementById(data.id)

    if (data.hasOwnProperty(`next`)) {
      this[data.next](data)
    }

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
      const errorElem = (data.hasOwnProperty(`error`))
        ? document.getElementById(data.error)
        : null

      this.storage.cursorPosition = elem.selectionStart

      if (!elem.value.includes(`;`)) {
        this.storage.prevVal = elem.value
        await this.updateState(data)
      }
      else {
        elem.value = this.storage.prevVal
        elem.selectionStart = elem.selectionEnd = this.storage.cursorPosition - 1

        if (data.hasOwnProperty(`error`)) {
          clearTimeout(this.storage.error)
          this.storage.error = null
          errorElem.classList.remove(`hidden`)

          this.storage.error = setTimeout(() => {
            if (errorElem) {
              errorElem.classList.add(`hidden`)
            }
          }, 2500)
        }
      }

      if (data.id === `message-input`) {
        const button = document.getElementById(`message-send`)

        if (elem.value.length) {
          button.disabled = false
        }
        else {
          button.disabled = true
        }
      }
    }, 0)

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
          data.value = deepGet(data.keys, this.state.table)

          if (data.value.includes(data.statistic)) {
            data.value = data.value.filter((value) => value !== data.statistic)
          }
          else {
            data.value.push(data.statistic)
          }

          break

        case `radio-array`:
          data.value = deepGet(data.keys, this.state.table)
          data.value = data.value
            .map((value) => value.includes(data.statistic)
              ? `${data.statistic}${data.id.split(data.statistic)[1]}`
              : value
            )

          break

        case `textarea-array`:
          data.value = deepGet(data.keys, this.state.table)
          data.value[data.index] = document.getElementById(data.id).value
          break
      }

      // Get object with new values
      let main = deepAssign(data.keys, data.value)

      if (!data.hasOwnProperty(`localStorage`) || !data.localStorage) {
        await this.store.dispatch(
          `setTableData`,
          {
            value: main,
          }
        )
      }
      else {
        this.storage.table[data.keys[0]] = main[data.keys[0]]
      }
    }

    return true
  }

  async messageCalculation (data) {
    const regexDice = /\[\+(\d+)d(\d+)\]/g
    const regexModifiers = /\[\+(\d+|proficiencyBonus|(?:strength|dexterity|constitution|intelligence|wisdom|charisma)Modifier)\]/g
    const dice = { d100: 0, d20: 0, d12: 0, d10: 0, d8: 0, d6: 0, d4: 0 }
    const modifiers = { statistics: [], absolutes: [] }
    let die = null
    let modifier = null
    let totalAmount = 0
    let result = ``

    const calculate = data.text
      .split(`::calculate-start::`)[1]
      .split(`::calculate-end::`)[0]
      .replace(/\n/g, ``)

    // Get dice roll count
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Examples
    while ((die = regexDice.exec(calculate)) !== null) {
      dice[`d${die[2]}`] = (die[1] === `x`)
        ? dice[`d${die[2]}`] + 1
        : dice[`d${die[2]}`] + Number(die[1])
    }

    // Get absolute modifiers and statistic modifiers
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Examples
    while ((modifier = regexModifiers.exec(calculate)) !== null) {
      if (isNaN(Number(modifier[1]))) {
        if (this.storage.table.hasOwnProperty(`monsterIndex`) && Number.isInteger(this.storage.table.monsterIndex)) {
          modifiers.statistics.push([modifier[0], this.state.table.monstersList[this.storage.table.monsterIndex][modifier[1]]])
          totalAmount += this.state.table.monstersList[this.storage.table.monsterIndex][modifier[1]]
        }
        else if (this.storage.table.hasOwnProperty(`characterIndex`) && Number.isInteger(this.storage.table.characterIndex)) {
          modifiers.statistics.push([modifier[0], this.state.table.charactersList[this.storage.table.characterIndex][modifier[1]]])
          totalAmount += this.state.table.charactersList[this.storage.table.characterIndex][modifier[1]]
        }
      }
      else {
        modifiers.absolutes.push([modifier[0], Number(modifier[1])])
        totalAmount += Number(modifier[1])
      }
    }

    // Roll dice
    Object.keys(dice).forEach((key) => {
      if (dice[key] > 0) {
        const dieType = Number(key.slice(1))
        let total = 0

        for (let i = dice[key]; i > 0; i--) {
          total += calculateDie(dieType)
        }

        dice[key] = { rolls: dice[key], result: total }
        totalAmount += total
      }
    })

    // Generate dice message
    Object.keys(dice).forEach((key) => {
      if (dice[key] !== 0) {
        result = (!result.length)
          ? `[+${dice[key][`rolls`]}${key}] ${dice[key][`result`]}`
          : `${result} [+${dice[key][`rolls`]}${key}] ${dice[key][`result`]}`
      }
    })

    // Generate statistic modifiers message
    modifiers.statistics.forEach((value) => {
      result = (!result.length)
        ? `${value[0]}`
        : `${result} ${value[0]} ${value[1]}`
    })

    // Generate absolute modifiers message
    modifiers.absolutes.forEach((value) => {
      result = (!result.length)
        ? `${value[0]}`
        : `${result} ${value[0]}`
    })

    // Generate total amount message
    result = (!result.length)
      ? `No valid calculations`
      : `${result} = ${totalAmount}`

    // Add text before ::calculate-start::
    const before = data.text
      .split(`::calculate-start::`)[0]
      .replace(/\n/g, ``)

    result = `${before}\n${result}`

    // Add text after ::calculate-end::
    const after = data.text
      .split(`::calculate-end::`)[1]
      .replace(/\n/g, ``)

    result = `${result}\n${after}`

    return result
  }

  async messageAction (data) {
    console.log(`messageAction`, data)

    switch (data.messageType) {
      case `hitpointsChange`:
      case `deathSavingsSuccessChange`:
      case `deathSavingsFailureChange`:
        break

      case `abilityCheck`:
      case `abilitySave`:
        break

      case `skillCheck`:
        break
    }

    /*
    messageAction({ messageType: 'hitpointsChange', id: 'player-battle-hitpoints' })
    messageAction({ messageType: 'deathSavingsSuccessChange', id: 'player-battle-savingThrowDeathSuccess' })
    messageAction({ messageType: 'deathSavingsFailureChange', id: 'player-battle-savingThrowDeathFailure' })
    messageAction({ messageType: 'abilityCheck', valueType: 'strength', value: storage.table.strengthModifier })
    messageAction({ messageType: 'abilitySave', valueType: 'strength', value: storage.table.savingThrowStrengthBonus })
    messageAction({ messageType: 'abilityCheck', valueType: 'dexterity', value: storage.table.dexterityModifier })
    messageAction({ messageType: 'abilitySave', valueType: 'dexterity', value: storage.table.savingThrowDexterityBonus })
    messageAction({ messageType: 'abilityCheck', valueType: 'constitution', value: storage.table.constitutionModifier })
    messageAction({ messageType: 'abilitySave', valueType: 'constitution', value: storage.table.savingThrowConstitutionBonus })
    messageAction({ messageType: 'abilityCheck', valueType: 'intelligence', value: storage.table.intelligenceModifier })
    messageAction({ messageType: 'abilitySave', valueType: 'intelligence', value: storage.table.savingThrowIntelligenceBonus })
    messageAction({ messageType: 'abilityCheck', valueType: 'wisdom', value: storage.table.wisdomModifier })
    messageAction({ messageType: 'abilitySave', valueType: 'wisdom', value: storage.table.savingThrowWisdomBonus })
    messageAction({ messageType: 'abilityCheck', valueType: 'charisma', value: storage.table.charismaModifier })
    messageAction({ messageType: 'abilitySave', valueType: 'charisma', value: storage.table.savingThrowCharismaBonus })
    messageAction({ messageType: 'skillCheck', valueType: 'athletics', value: storage.table.skillAthleticsModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'acrobatics', value: storage.table.skillAcrobaticsModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'sleightOfHand', value: storage.table.skillSleightOfHandModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'stealth', value: storage.table.skillStealthModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'arcana', value: storage.table.skillArcanaModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'history', value: storage.table.skillHistoryModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'investigation', value: storage.table.skillInvestigationModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'nature', value: storage.table.skillNatureModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'religion', value: storage.table.skillReligionModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'animalHandling', value: storage.table.skillAnimalHandlingModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'insight', value: storage.table.skillInsightModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'medicine', value: storage.table.skillMedicineModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'perception', value: storage.table.skillPerceptionModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'survival', value: storage.table.skillSurvivalModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'deception', value: storage.table.skillDeceptionModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'intimidation', value: storage.table.skillIntimidationModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'performance', value: storage.table.skillPerformanceModifier })
    messageAction({ messageType: 'skillCheck', valueType: 'persuasion', value: storage.table.skillPersuasionModifier })
    */

    return true
  }

  async commitMessage (data) {
    const elem = document.getElementById(data.elemID)
    const button = document.getElementById(`message-send`)
    let text = elem.value

    const messenger = (this.state.table.owner === this.state.username)
      ? {
          id: null,
          name: `DM`,
        }
      : {
          id: this.state.table.charactersList[this.storage.table.characterIndex].id,
          name: this.state.table.charactersList[this.storage.table.characterIndex].name,
        }

    if (text.includes(`::calculate-start::`) && text.includes(`::calculate-end::`)) {
      text = await this.messageCalculation({ elem: elem, text: text })
    }

    text = text
      .split(`\n`)
      .reduce((acc, value) => {
        if (value.length) {
          acc.push(value)
        }

        return acc
      }, [])

    if (text.length) {
      await this.store.dispatch(`setToken`, await this.http.get(`/token`))
      const result = await this.http.post(
        `/table/commitMessage`,
        {
          token: this.state.token,
          table: this.state.table.id,
          username: this.state.username,
          senderID: messenger.id,
          senderName: messenger.name,
          type: `typeText`,
          text: JSON.stringify(text),
          action: JSON.stringify({}),
          websocketType: `commitMessage`,
        }
      )

      if (result.success) {
        await this.store.dispatch(
          `commitMessage`,
          {
            table: this.state.table.id,
            username: this.state.username,
            senderID: messenger.id,
            senderName: messenger.name,
            type: `typeText`,
            text: text,
            action: {},
          }
        )

        setTimeout(() => {
          if (document.getElementsByClassName(`message`).length) {
            const messages = document.getElementsByClassName(`message`)
            messages[messages.length - 1].scrollIntoView()
          }
        }, 0)
      }
      else {
        console.log(`server-error: commitMessage`)
        document.getElementById(`form-error`).classList.remove(`hidden`)

        setTimeout(() => {
          if (document.getElementById(`form-error`)) {
            document.getElementById(`form-error`).classList.add(`hidden`)
          }
        }, 2500)
      }
    }

    elem.value = ``
    button.disabled = true
    return true
  }

  async updateTableData () {
    const settings = {
      name: this.storage.table.name,
      passcode: this.storage.table.passcode,
      maxPlayers: this.storage.table.maxPlayers,
      published: this.storage.table.published,
    }

    // Convert string to integer
    this.storage.table.maxPlayers = Number(this.storage.table.maxPlayers)
    settings.maxPlayers = Number(settings.maxPlayers)

    // Convert boolean to integer
    settings.published = (settings.published === true)
      ? 1
      : 0

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/table/updateTableData`,
      {
        token: this.state.token,
        table: this.state.table.id,
        owner: this.state.username,
        name: settings.name,
        passcode: settings.passcode,
        maxPlayers: Number(settings.maxPlayers),
        published: settings.published,
        websocketType: `tableUpdate`,
      }
    )

    if (result.success) {
      await this.store.dispatch(
        `updateTableData`,
        {
          name: this.storage.table.name,
          passcode: this.storage.table.passcode,
          maxPlayers: Number(this.storage.table.maxPlayers),
          published: this.storage.table.published,
        }
      )

      document.getElementById(`dm-table`).children[0].children[0].click()
    }
    else {
      console.log(`server-error: tableUpdate`)
      document.getElementById(`form-error`).classList.remove(`hidden`)

      setTimeout(() => {
        if (document.getElementById(`form-error`)) {
          document.getElementById(`form-error`).classList.add(`hidden`)
        }
      }, 2500)
    }
    return false
  }

  async updateCharacterInfo (formID, action, url) {
    // Convert string to integer
    this.storage.table.xp = Number(this.storage.table.xp)
    this.storage.table.coinCopper = Number(this.storage.table.coinCopper)
    this.storage.table.coinSilver = Number(this.storage.table.coinSilver)
    this.storage.table.coinElectrum = Number(this.storage.table.coinElectrum)
    this.storage.table.coinGold = Number(this.storage.table.coinGold)
    this.storage.table.coinPlatinum = Number(this.storage.table.coinPlatinum)

    // Calculate xpNextLevel
    const xpNextLevel = this.form.character.dependants[1](this.storage.table, this.form.character)

    this.storage.table = {
      ...this.storage.table,
      [xpNextLevel[0]]: Number(xpNextLevel[1]),
    }

    await this.store.dispatch(`setToken`, await this.http.get(`/token`))
    const result = await this.http.post(
      `/table/updateCharacterInfo`,
      {
        token: this.state.token,
        table: this.state.table.id,
        owner: this.state.username,
        character: this.storage.table.characterID,
        xp: this.storage.table.xp,
        xpNextLevel: this.storage.table.xpNextLevel,
        coinCopper: this.storage.table.coinCopper,
        coinSilver: this.storage.table.coinSilver,
        coinElectrum: this.storage.table.coinElectrum,
        coinGold: this.storage.table.coinGold,
        coinPlatinum: this.storage.table.coinPlatinum,
        notes: this.storage.table.notes,
        websocketType: `characterUpdate`,
      }
    )

    if (result.success) {
      const { index } = this.state.table.charactersList
        .map((value, index) => ({ id: value.id, index: index }))
        .filter((value) => value.id === this.storage.table.characterID)[0]

      await this.store.dispatch(
        `updateTableCharacter`,
        {
          index: index,
          xp: this.storage.table.xp,
          xpNextLevel: this.storage.table.xpNextLevel,
          coinCopper: this.storage.table.coinCopper,
          coinSilver: this.storage.table.coinSilver,
          coinElectrum: this.storage.table.coinElectrum,
          coinGold: this.storage.table.coinGold,
          coinPlatinum: this.storage.table.coinPlatinum,
          notes: this.storage.table.notes,
        }
      )

      document.getElementById(`player-character`).children[0].children[0].click()
    }
    else {
      console.log(`server-error: characterUpdate`)
      document.getElementById(`form-error`).classList.remove(`hidden`)

      setTimeout(() => {
        if (document.getElementById(`form-error`)) {
          document.getElementById(`form-error`).classList.add(`hidden`)
        }
      }, 2500)
    }

    return false
  }

  enableButton (id) {
    const select = document.getElementById(id)
    const button = select.nextElementSibling

    button.disabled = (select.selectedIndex === 0)
      ? true
      : false

    return true
  }

  async tableAddRemoveMonstersCharacters (data) {
    const select = document.getElementById(data.elemID)
    let filter = null
    let index = (data.elemID !== `player-resign`)
      ? Number(select[select.selectedIndex].value)
      : select[select.selectedIndex].value

    data.id = this.state.table.id
    data.index = this.state.tablesList
      .map((value) => value.id)
      .indexOf(data.id)

    if (data.elemID === `monsters-tab-select-add`) {
      data.monstersIDs = [
        ...this.state.table.monstersIDs,
        this.state.monstersList[index].id,
      ]

      data.monstersList = [
        ...this.state.table.monstersList,
        this.state.monstersList[index],
      ]

      data.monstersData = [
        ...this.state.table.monstersData,
        {
          id: this.state.monstersList[index].id,
          statusEffect: [],
          hpCurr: this.state.monstersList[data.index].hpMax,
        },
      ]

      await this.store.dispatch(`setToken`, await this.http.get(`/token`))
      const result = await this.http.post(
        `/table/updateTablesListMonsters`,
        {
          token: this.state.token,
          assetid: data.id,
          monstersIDs: data.monstersIDs.join(`;`),
          monstersList: [this.state.monstersList[index]],
          monstersData: JSON.stringify(data.monstersData),
          websocketType: `monsterAdd`,
        }
      )

      if (result.success) {
        this.store.dispatch(
          `updateTablesListMonsters`,
          {
            index: data.index,
            monstersIDs: [...data.monstersIDs],
            monstersData: [...data.monstersData],
          }
        )

        this.store.dispatch(
          `updateTableMonsters`,
          {
            monstersIDs: [...data.monstersIDs],
            monstersList: [...data.monstersList],
            monstersData: [...data.monstersData],
          }
        )
      }
    }
    else if (data.elemID === `monsters-tab-select-remove`) {
      filter = this.state.table.monstersIDs[index]
      data.monstersIDs = this.state.table.monstersIDs
        .filter((value) => value !== filter)

      filter = this.state.table.monstersList[index]
      data.monstersList = this.state.table.monstersList
        .filter((value) => value.id !== filter.id)

      filter = this.state.table.monstersData[index]
      data.monstersData = this.state.table.monstersData
        .filter((value) => value.id !== filter.id)

      await this.store.dispatch(`setToken`, await this.http.get(`/token`))
      const result = await this.http.post(
        `/table/updateTablesListMonsters`,
        {
          token: this.state.token,
          assetid: data.id,
          monsterID: this.state.table.monstersIDs[index],
          monstersIDs: data.monstersIDs.join(`;`),
          monstersData: JSON.stringify(data.monstersData),
          websocketType: `monsterRemove`,
        }
      )

      if (result.success) {
        this.store.dispatch(
          `updateTablesListMonsters`,
          {
            index: data.index,
            monstersIDs: [...data.monstersIDs],
            monstersData: [...data.monstersData],
          }
        )

        this.store.dispatch(
          `updateTableMonsters`,
          {
            monstersIDs: [...data.monstersIDs],
            monstersList: [...data.monstersList],
            monstersData: [...data.monstersData],
          }
        )
      }
    }
    else {
      if (data.elemID === `player-resign`) {
        index = this.state.table.players.indexOf(index)
      }

      filter = this.state.table.players[index]
      data.players = this.state.table.players
        .filter((value) => value !== filter)

      filter = this.state.table.charactersIDs[index]
      data.charactersIDs = this.state.table.charactersIDs
        .filter((value) => value !== filter)

      filter = this.state.table.charactersList[index]
      data.charactersList = this.state.table.charactersList
        .filter((value) => value.id !== filter.id)

      filter = this.state.table.charactersData[index]
      data.charactersData = this.state.table.charactersData
        .filter((value) => value.id !== filter.id)

      await this.store.dispatch(`setToken`, await this.http.get(`/token`))
      const result = await this.http.post(
        `/table/updateTablesListCharacters`,
        {
          token: this.state.token,
          assetid: data.id,
          player: this.state.table.players[index],
          characterID: this.state.table.charactersIDs[index],
          players: data.players.join(`;`),
          charactersIDs: data.charactersIDs.join(`;`),
          charactersData: JSON.stringify(data.charactersData),
          websocketType: `characterRemove`,
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

        this.store.dispatch(
          `updateTableCharacters`,
          {
            players: [...data.players],
            charactersIDs: [...data.charactersIDs],
            charactersList: [...data.charactersList],
            charactersData: [...data.charactersData],
          }
        )
      }

      if (data.elemID === `player-resign`) {
        this.router.navigateToRoute(`lobby`, { username: this.storage.username })
      }
    }

    if (select && select.selectedIndex > 0) {
      select.selectedIndex = 0
      this.enableButton(data.elemID)
    }

    return true
  }
}
