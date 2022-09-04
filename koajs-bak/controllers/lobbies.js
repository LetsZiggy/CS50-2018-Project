/**
 * Module dependencies
 */

const Model = require('../models/lobbies')



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
  getAll: async (ctx, next) => {
    let result = await Model.getAll(ctx, next)

    if (!result) {
      result = {
        rooms: [],
      }
    }

    result = {
      success: true,
      payload: {
        roomsList: result.rooms,
      },
    }

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
  create: async (ctx, next) => {
    let result = await Model.create(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      ctx.cookies.set(`assettype`, ctx.request.body.modelType, ctx.state.cookies.client)
      ctx.cookies.set(`assetid`, result.payload.id, ctx.state.cookies.client)
      // ctx.cookies.set(`assettype`, ctx.request.body.modelType, ctx.state.cookies.clientHttps)
      // ctx.cookies.set(`assetid`, result.payload.id, ctx.state.cookies.clientHttps)
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
