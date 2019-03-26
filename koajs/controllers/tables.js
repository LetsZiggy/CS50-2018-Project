/**
 * Module dependencies
 */

const Model = require('../models/tables')
const { wsActions } = require('../app-services')



/**
 * Set constants
 */

// PLACEHOLDER



/**
 * Set controller
 */

const Ctrl = {
  checkToken: async (ctx, next) => {
    const validLogin = (ctx.cookies.get(`userid`) && ctx.cookies.get(`userid`).length > 0)
    const validToken = (ctx.state.KEYS_LIST[Number(ctx.cookies.get(`token`))] === ctx.request.body.token)

    if (validToken && validLogin) {
      await next()

      ctx.cookies.set(`userid`, ctx.cookies.get(`userid`), ctx.state.cookies.server)
      ctx.cookies.set(`username`, ctx.cookies.get(`username`), ctx.state.cookies.client)
      // ctx.cookies.set(`userid`, ctx.cookies.get(`userid`), ctx.state.cookies.serverHttps)
      // ctx.cookies.set(`username`, ctx.cookies.get(`username`), ctx.state.cookies.clientHttps)
    }
    else {
      ctx.body = {
        success: false,
        payload: `bad token`,
      }
    }
  },
  setCookies: async (ctx, next) => {
    let result = await Model.setCookies(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.client)
      ctx.cookies.set(`assetid`, result.payload.id, ctx.state.cookies.client)
      // ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.clientHttps)
      // ctx.cookies.set(`assetid`, result.payload.id, ctx.state.cookies.clientHttps)
    }
    else if (result.error === `wrong credentials`) {
      result = {
        success: false,
        payload: result.error,
      }

      ctx.cookies.set(`assettype`, ``, ctx.state.cookies.clientExpire)
      ctx.cookies.set(`assetid`, ``, ctx.state.cookies.clientExpire)
      // ctx.cookies.set(`assettype`, ``, ctx.state.cookies.clientExpireHttps)
      // ctx.cookies.set(`assetid`, ``, ctx.state.cookies.clientExpireHttps)
    }
    else {
      result = {
        success: false,
        payload: `server error`,
      }

      ctx.cookies.set(`assettype`, ``, ctx.state.cookies.clientExpire)
      ctx.cookies.set(`assetid`, ``, ctx.state.cookies.clientExpire)
      // ctx.cookies.set(`assettype`, ``, ctx.state.cookies.clientExpireHttps)
      // ctx.cookies.set(`assetid`, ``, ctx.state.cookies.clientExpireHttps)
    }

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
  getOne: async (ctx, next) => {
    let result = await Model.getOne(ctx, next)

    if (result.error) {
      result = []
    }

    result = {
      success: true,
      payload: {
        tablesList: result,
      },
    }

    ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.client)
    ctx.cookies.set(`assetid`, ctx.request.body.id, ctx.state.cookies.client)
    // ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.clientHttps)
    // ctx.cookies.set(`assetid`, ctx.request.body.id, ctx.state.cookies.clientHttps)

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)
 
    ctx.body = result
  },
  getAll: async (ctx, next) => {
    let result = await Model.getAll(ctx, next)

    if (result.error) {
      result = []
    }

    result = {
      success: true,
      payload: {
        tablesList: result,
      },
    }

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)
 
    ctx.body = result
  },
  getCurrentTableData: async (ctx, next) => {
    let result = await Model.getCurrentTableData(ctx, next)

    if (!result) {
      result = {
        characters: [],
        monsters: [],
        messages: [],
      }
    }

    result = {
      success: true,
      payload: {
        characters: result.characters,
        monsters: result.monsters,
        messages: result.messages,
      },
    }

    ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.client)
    ctx.cookies.set(`assetid`, ctx.request.body.tableID, ctx.state.cookies.client)
    // ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.clientHttps)
    // ctx.cookies.set(`assetid`, ctx.request.body.tableID, ctx.state.cookies.clientHttps)

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)
 
    ctx.body = result
  },
  delete: async (ctx, next) => {
    let result = await Model.delete(ctx, next)

    if (result.stmt.changes === 1) {
      result = {
        success: true,
        payload: result,
      }
    }
    else {
      result = {
        success: false,
        payload: `error`,
      }
    }

    wsActions.tableDelete({ id: ctx.request.body.assetid })

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
  updateTablesListMonsters: async (ctx, next) => {
    let result = await Model.updateTablesListMonsters(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      if (ctx.request.body.hasOwnProperty(`websocketType`)) {
        if (ctx.request.body.websocketType === `monsterAdd`) {
          wsActions.monsterAdd({
            table: ctx.request.body.assetid,
            monstersIDs: ctx.request.body.monstersIDs,
            monstersList: ctx.request.body.monstersList,
            monstersData: ctx.request.body.monstersData,
          })
        }

        if (ctx.request.body.websocketType === `monsterRemove`) {
          wsActions.monsterRemove({
            table: ctx.request.body.assetid,
            monsterID: ctx.request.body.monsterID,
          })
        }
      }

      ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.client)
      ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.client)
      // ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.clientHttps)
      // ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.clientHttps)
    }
    else if (result.error === `wrong credentials`) {
      result = {
        success: false,
        payload: result.error,
      }
    }
    else {
      result = {
        success: false,
        payload: `server error`,
      }
    }

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
  updateTablesListCharacters: async (ctx, next) => {
    let result = await Model.updateTablesListCharacters(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      if (ctx.request.body.hasOwnProperty(`websocketType`)) {
        if (ctx.request.body.websocketType === `characterAdd`) {
          wsActions.characterAdd({
            table: ctx.request.body.assetid,
            players: ctx.request.body.players,
            charactersIDs: ctx.request.body.charactersIDs,
            charactersList: ctx.request.body.charactersList,
            charactersData: ctx.request.body.charactersData,
          })
        }

        if (ctx.request.body.websocketType === `characterRemove`) {
          wsActions.characterRemove({
            table: ctx.request.body.assetid,
            player: ctx.request.body.player,
            characterID: ctx.request.body.characterID,
          })
        }
      }

      ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.client)
      ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.client)
      // ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.clientHttps)
      // ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.clientHttps)
    }
    else if (result.error === `wrong credentials`) {
      result = {
        success: false,
        payload: result.error,
      }
    }
    else {
      result = {
        success: false,
        payload: `server error`,
      }
    }

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
  updateTableData: async (ctx, next) => {
    let result = await Model.updateTableData(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      wsActions.tableUpdate({
        username: ctx.request.body.username,
        table: ctx.request.body.table,
        name: ctx.request.body.name,
        passcode: ctx.request.body.passcode,
        maxPlayers: ctx.request.body.maxPlayers,
        published: ctx.request.body.published,
      })

      ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.client)
      ctx.cookies.set(`assetid`, ctx.request.body.table, ctx.state.cookies.client)
      // ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.clientHttps)
      // ctx.cookies.set(`assetid`, ctx.request.body.table, ctx.state.cookies.clientHttps)
    }
    else if (result.error === `wrong credentials`) {
      result = {
        success: false,
        payload: result.error,
      }
    }
    else {
      result = {
        success: false,
        payload: `server error`,
      }
    }

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
  updateCharacterInfo: async (ctx, next) => {
    let result = await Model.updateCharacterInfo(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      wsActions.characterUpdate({
        table: ctx.request.body.table,
        id: ctx.request.body.character,
        $xp: ctx.request.body.xp,
        $xpNextLevel: ctx.request.body.xpNextLevel,
        coinCopper: ctx.request.body.coinCopper,
        coinSilver: ctx.request.body.coinSilver,
        coinElectrum: ctx.request.body.coinElectrum,
        coinGold: ctx.request.body.coinGold,
        coinPlatinum: ctx.request.body.coinPlatinum,
        notes: ctx.request.body.notes,
      })

      ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.client)
      ctx.cookies.set(`assetid`, ctx.request.body.table, ctx.state.cookies.client)
      // ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.clientHttps)
      // ctx.cookies.set(`assetid`, ctx.request.body.table, ctx.state.cookies.clientHttps)
    }
    else if (result.error === `wrong credentials`) {
      result = {
        success: false,
        payload: result.error,
      }
    }
    else {
      result = {
        success: false,
        payload: `server error`,
      }
    }

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
  commitMessage: async (ctx, next) => {
    let result = await Model.commitMessage(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      wsActions.commitMessage({
        table: ctx.request.body.table,
        username: ctx.request.body.username,
        senderID: ctx.request.body.senderID,
        senderName: ctx.request.body.senderName,
        type: ctx.request.body.type,
        text: ctx.request.body.text,
        action: ctx.request.body.action,
      })
    }
    else {
      result = {
        success: false,
        payload: `server error`,
      }
    }

    ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.client)
    ctx.cookies.set(`assetid`, ctx.request.body.table, ctx.state.cookies.client)
    // ctx.cookies.set(`assettype`, `table`, ctx.state.cookies.clientHttps)
    // ctx.cookies.set(`assetid`, ctx.request.body.table, ctx.state.cookies.clientHttps)

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
}



/**
 * Export controller
 */

module.exports = Ctrl
