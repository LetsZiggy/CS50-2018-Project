/**
 * Module dependencies
 */

// For development in Windows only
require('dotenv').config()

// https://nodejs.org/api/http.html
const http = require('http')

// https://nodejs.org/api/path.html
const path = require('path')

// https://github.com/koajs/koa/wiki
const Koa = require('koa')

// https://github.com/websockets/ws
const Websocket = require('ws')

// https://github.com/alexmingoia/koa-router
const Router = require('koa-router')

// https://github.com/koajs/json-error
const error = require('koa-json-error')

// https://github.com/koajs/response-time
const responseTime = require('koa-response-time')

// https://github.com/koajs/logger
const logger = require('koa-logger')

// https://github.com/koajs/cors
const cors = require('@koa/cors')

// https://github.com/koajs/bodyparser
const bodyParser = require('koa-bodyparser')

// https://github.com/koajs/favicon
const favicon = require('koa-favicon')

// https://github.com/koajs/compress
const compress = require('koa-compress')

// https://github.com/jeffijoe/koa-respond
const respond = require('koa-respond')

// https://github.com/venables/koa-helmet
const helmet = require('koa-helmet')

// https://github.com/koajs/static
const serve = require('koa-static')

// https://github.com/kriasoft/node-sqlite
const sqlite = require('sqlite')

const { generateKey, removeKey, normalizePort, websockets, wsActions } = require('./app-services')



/**
 * Initialise Koa
 */

const koa = new Koa()
const router = new Router()
const port = normalizePort(process.env.PORT || `3000`)
const MAX_AGE = 1000 * 60 * 60 * 4 // maxAge: 0 || (MAX_AGE / 1000)
const KEYS = { INDEX: 0, LIST: [] }
for (let i = 0; i < 15; i++) { KEYS.LIST.push(generateKey(KEYS.LIST)) }



/**
 * Set Koa middlewares
 */

koa.use(error())
koa.use(responseTime())
koa.use(logger())
koa.use(cors())
koa.use(bodyParser())
koa.use(favicon(path.join(__dirname, `/public/favicon.ico`)))
koa.use(compress({ threshold: 1024, flush: require(`zlib`).Z_SYNC_FLUSH }))
koa.use(respond())
koa.use(helmet())



/**
 * sqlite.db middleware
 */

koa.use(async (ctx, next) => {
  const expired = new Date()
  const isValid = new Date((Date.now() + MAX_AGE))

  ctx.state.db = await sqlite.open(`./database/db.sqlite`, { Promise })
  ctx.state.KEYS_LIST = KEYS.LIST
  ctx.state.cookies = {
    serverExpire:      { expires: expired, path: `/`, sameSite: true, secure: false, httpOnly: true },
    clientExpire:      { expires: expired, path: `/`, sameSite: true, secure: false, httpOnly: false },
    server:            { expires: isValid, path: `/`, sameSite: true, secure: false, httpOnly: true },
    client:            { expires: isValid, path: `/`, sameSite: true, secure: false, httpOnly: false },
    serverExpireHttps: { expires: expired, path: `/`, sameSite: true, secure: true, httpOnly: true },
    clientExpireHttps: { expires: expired, path: `/`, sameSite: true, secure: true, httpOnly: false },
    serverHttps:       { expires: isValid, path: `/`, sameSite: true, secure: true, httpOnly: true },
    clientHttps:       { expires: isValid, path: `/`, sameSite: true, secure: true, httpOnly: false },
  }

  await next()
  await ctx.state.db.close()
})



/**
 * Set Koa routes
 */

router.get(`/token`, (ctx, next) => {
  const index = KEYS.INDEX
  const key = KEYS.LIST[KEYS.INDEX]

  KEYS.INDEX++
  KEYS.INDEX = (KEYS.INDEX >= KEYS.LIST.length) ? 0 : KEYS.INDEX

  ctx.cookies.set(`token`, index, ctx.state.cookies.server)
  // ctx.cookies.set(`token`, index, ctx.state.cookies.serverHttps)

  ctx.body = { token: key }
})

require(`./routes`)(router)
koa.use(router.routes())
koa.use(router.allowedMethods())



/**
 * Set static files path
 */

koa.use(serve(path.join(__dirname, `../aureliajs`)))
koa.use(serve(path.join(__dirname, `/public`)))



/**
 * Run servers
 */

// https://medium.com/@tarkus/node-js-and-sqlite-for-rapid-prototyping-bc9cf1f26f10
// const apiServer = Promise.resolve()
//                       .then(() => sqlite.open(`./database/db.sqlite`, { Promise }))
//                       .catch((err) => console.error(err))
//                       .finally(() => koa.listen(port, () => {
//                         console.log(`Listening on port:${port}`)
//                         console.log(`localhost:${port}`)
//                       }))

const apiServer =  koa.listen(port, () => {
  console.log(`Listening on port:${port}`)
  console.log(`localhost:${port}`)
})

const wsServer = new Websocket.Server({ server: apiServer })

wsServer.on('connection', async (ws) => {
  ws.isAlive = true

  ws.on('pong', () => { ws.isAlive = true })

  ws.on('message', async (data) => {
    data = JSON.parse(data)

    switch (data.type) {
      case `tableEnter`:
        wsActions.tableEnter(ws, data.payload)
        break

      case `tableExit`:
        wsActions.tableExit(ws, data.payload)
        break
    }
  })
})

// https://github.com/websockets/ws#how-to-detect-and-close-broken-connections
const wsCheck = setInterval(() => {
  wsServer.clients.forEach((client) => {
    if(!client.isAlive) {
      if (websockets.users.hasOwnProperty(client.username)) {
        delete websockets.users[client.username]
      }

      if (websockets.tables[client.table].includes(client.username)) {
        const index = websockets.tables[client.table].indexOf(client.username)
        websockets.tables[client.table].splice(index, 1)
      }

      if (!websockets.tables[client.table].length) {
        delete websockets.tables[client.table]
      }

      return client.terminate()
    }

    client.isAlive = false
    client.ping(null, false, true)
  })
}, 30000)



/**
 * Export modules
 */

// module.exports = {
  // PLACEHOLDER
// }
