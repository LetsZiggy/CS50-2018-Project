/**
 * Module dependencies
 */

const Model = require('../models/rooms')
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

      ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.client)
      ctx.cookies.set(`assetid`, result.payload.id, ctx.state.cookies.client)
      // ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.clientHttps)
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
        roomsList: result,
      },
    }

    ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.client)
    ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.client)
    // ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.clientHttps)
    // ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.clientHttps)

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
        roomsList: result,
      },
    }

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

    wsActions.roomDelete({ room: ctx.request.body.assetid })

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
  getRoomMacros: async (ctx, next) => {
    let result = await Model.getRoomMacros(ctx, next)

    if (result.error) {
      result = []
    }

    result = {
      success: true,
      payload: {
        macros: result,
      },
    }

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
  getRoomMessages: async (ctx, next) => {
    let result = await Model.getRoomMessages(ctx, next)

    if (result.error) {
      result = []
    }

    result = {
      success: true,
      payload: {
        messages: result,
      },
    }

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
  updateRoomUsers: async (ctx, next) => {
    let result = await Model.updateRoomUsers(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      if (ctx.request.body.hasOwnProperty(`websocketType`)) {
        if (ctx.request.body.websocketType === `userAdd`) {
          wsActions.userAdd({
            room: ctx.request.body.assetid,
            users: ctx.request.body.users,
          })
        }

        if (ctx.request.body.websocketType === `userRemove`) {
          wsActions.userRemove({
            room: ctx.request.body.assetid,
            user: ctx.request.body.user,
          })
        }
      }

      ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.client)
      ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.client)
      // ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.clientHttps)
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
  updateRoomData: async (ctx, next) => {
    let result = await Model.updateRoomData(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }

      wsActions.roomUpdate({
        username: ctx.request.body.username,
        room: ctx.request.body.assetid,
        name: ctx.request.body.name,
        passcode: ctx.request.body.passcode,
        maxUsers: ctx.request.body.maxUsers,
        visible: ctx.request.body.visible,
      })

      ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.client)
      ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.client)
      // ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.clientHttps)
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
  createRoomMacros: async (ctx, next) => {
    let result = await Model.createRoomMacros(ctx, next)

    if (result.id) {
      result = {
        success: true,
        payload: result,
      }
    }
    else {
      result = {
        success: false,
        payload: `server error`,
      }
    }

    ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.client)
    ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.client)
    // ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.clientHttps)
    // ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.clientHttps)

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
  removeRoomMacros: async (ctx, next) => {
    let result = await Model.removeRoomMacros(ctx, next)

    if (result.stmt.changes === 1) {
      result = {
        success: true,
        payload: result,
      }
    }
    else {
      result = {
        success: false,
        payload: `server error`,
      }
    }

    ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.client)
    ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.client)
    // ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.clientHttps)
    // ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.clientHttps)

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
        room: ctx.request.body.assetid,
        owner: ctx.request.body.owner,
        utc: ctx.request.body.utc,
        title: ctx.request.body.title,
        text: ctx.request.body.text,
      })
    }
    else {
      result = {
        success: false,
        payload: `server error`,
      }
    }

    ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.client)
    ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.client)
    // ctx.cookies.set(`assettype`, `room`, ctx.state.cookies.clientHttps)
    // ctx.cookies.set(`assetid`, ctx.request.body.assetid, ctx.state.cookies.clientHttps)

    ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpire)
    // ctx.cookies.set(`token`, ``, ctx.state.cookies.serverExpireHttps)

    ctx.body = result
  },
}



/**
 * Export controller
 */

module.exports = Ctrl
