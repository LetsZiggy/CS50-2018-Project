/**
 * Module dependencies
 */

const Model = require('../models/entrances')



/**
 * Set constants
 */

// PLACEHOLDER



/**
 * Set controller
 */

const Ctrl = {
  checkToken: async (ctx, next) => {
    const validRoute = [`/entrance/check`, `/entrance/signout`].includes(ctx._matchedRoute)
    const validToken = (ctx.state.KEYS_LIST[Number(ctx.cookies.get(`token`))] === ctx.request.body.token)

    if (validToken || validRoute) {
      await next()
    }
    else {
      ctx.body = {
        success: false,
        payload: `bad token`,
      }
    }
  },
  checkUsername: async (ctx, next) => {
    let result = await Model.checkUsername(ctx, next)

    if (!result.taken) {
      result = {
        success: true,
        payload: `username available`
      }
    }
    else if (result.taken) {
      result = {
        success: false,
        payload: `username taken`
      }
    }
    else {
      result = {
        success: false,
        payload: `server error`,
      }
    }

    ctx.body = result
  },
  signout: async (ctx, next) => {
    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    ctx.cookies.set(`userid`, ``, ctx.state.cookies.serverExpire)
    ctx.cookies.set(`username`, ``, ctx.state.cookies.clientExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)
    // ctx.cookies.set(`userid`, ``, ctx.state.cookies.serverExpireHttps)
    // ctx.cookies.set(`username`, ``, ctx.state.cookies.clientExpireHttps)

    ctx.body = {
      success: true,
      payload: `ok`,
    }
  },
  signin: async (ctx, next) => {
    let result = await Model.signin(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      ctx.cookies.set(`userid`, result.payload.id, ctx.state.cookies.server)
      ctx.cookies.set(`username`, result.payload.username, ctx.state.cookies.client)
      // ctx.cookies.set(`userid`, result.payload.id, ctx.state.cookies.serverHttps)
      // ctx.cookies.set(`username`, result.payload.username, ctx.state.cookies.clientHttps)
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
  register: async (ctx, next) => {
    let result = await Model.register(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      ctx.cookies.set(`userid`, result.payload.id, ctx.state.cookies.server)
      ctx.cookies.set(`username`, result.payload.username, ctx.state.cookies.client)
      // ctx.cookies.set(`userid`, result.payload.id, ctx.state.cookies.serverHttps)
      // ctx.cookies.set(`username`, result.payload.username, ctx.state.cookies.clientHttps)
    }
    else if (result.error === `username taken`) {
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
  reset: async (ctx, next) => {
    let result = await Model.reset(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      ctx.cookies.set(`userid`, result.payload.id, ctx.state.cookies.server)
      ctx.cookies.set(`username`, result.payload.username, ctx.state.cookies.client)
      // ctx.cookies.set(`userid`, result.payload.id, ctx.state.cookies.serverHttps)
      // ctx.cookies.set(`username`, result.payload.username, ctx.state.cookies.clientHttps)
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
