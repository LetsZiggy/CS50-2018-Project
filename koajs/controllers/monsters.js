/**
 * Module dependencies
 */

const Model = require('../models/monsters')
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

      ctx.cookies.set(`assettype`, `monster`, ctx.state.cookies.client)
      ctx.cookies.set(`assetid`, result.payload.id, ctx.state.cookies.client)
      // ctx.cookies.set(`assettype`, `monster`, ctx.state.cookies.clientHttps)
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
  getAll: async (ctx, next) => {
    let result = await Model.getAll(ctx, next)

    if (result.error) {
      result = []
    }

    result = {
      success: true,
      payload: {
        monstersList: result,
      },
    }

    /*
    ctx.cookies.set(`assettype`, `monster`, ctx.state.cookies.client)
    ctx.cookies.set(`assetid`, result.payload.id, ctx.state.cookies.client)
    // ctx.cookies.set(`assettype`, `monster`, ctx.state.cookies.clientHttps)
    // ctx.cookies.set(`assetid`, result.payload.id, ctx.state.cookies.clientHttps)
    */

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

      wsActions.monsterDelete({ id: ctx.request.body.assetid })
    }
    else {
      result = {
        success: false,
        payload: `error`,
      }
    }

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
  update: async (ctx, next) => {
    let result = await Model.update(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      wsActions.monsterUpdate(ctx.request.body.monster)

      ctx.cookies.set(`assettype`, ``, ctx.state.cookies.clientExpire)
      ctx.cookies.set(`assetid`, ``, ctx.state.cookies.clientExpire)
      // ctx.cookies.set(`assettype`, ``, ctx.state.cookies.clientExpireHttps)
      // ctx.cookies.set(`assetid`, ``, ctx.state.cookies.clientExpireHttps)
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
}



/**
 * Export controller
 */

module.exports = Ctrl
