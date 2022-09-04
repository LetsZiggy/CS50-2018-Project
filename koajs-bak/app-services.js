/**
 * Create random string and remove key from array
 */

const users = [
  `0`,`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,
  `a`,`b`,`c`,`d`,`e`,`f`,`g`,`h`,`i`,`j`,`k`,`l`,`m`,`n`,`o`,`p`,`q`,`r`,`s`,`t`,`u`,`v`,`w`,`x`,`y`,`z`,
  `A`,`B`,`C`,`D`,`E`,`F`,`G`,`H`,`I`,`J`,`K`,`L`,`M`,`N`,`O`,`P`,`Q`,`R`,`S`,`T`,`U`,`V`,`W`,`X`,`Y`,`Z`,
  `!`,`@`,`#`,`$`,`%`,`^`,`&`,`*`,
]

function generateKey (keys) {
  const length = 16
  let run = true
  let key = []

  while (run) {
    for(let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * 62)
      key.push(users[index])
    }

    key = key.join(``)

    if(keys.indexOf(key) === -1) {
      run = false
    }
    else {
      key = []
    }
  }

  return key
}

function removeKey (key, keys) {
  const index = keys.indexOf(key)
  keys.splice(index, 1)

  return keys
}



/**
 * Normalize a port into a number, string, or false
 */

function normalizePort (value) {
  const port = parseInt(value, 10)

  if (isNaN(port)) {
    // Named pipe
    return value
  }

  if (port >= 0) {
    // Port number
    return port
  }

  return false
}



/**
 * Websockets storage
 */

const websockets = { users: {}, rooms: {} }



/**
 * Set Websocket actions
 */

const wsActions = {
  // Register user to websockets
  roomEnter: (ws, payload) => {
    console.log(`roomEnter`)
    ws.username = payload.username
    ws.room = payload.room
    websockets.users[payload.username] = ws
    websockets.rooms[payload.room] =
      (!Array.isArray(websockets.rooms[payload.room]))
        ? [payload.username]
        : (!websockets.rooms[payload.room].includes(payload.username))
          ? [...websockets.rooms[payload.room], payload.username]
          : [...websockets.rooms[payload.room]]
  },
  // Remove user from websockets
  roomExit: (ws, payload) => {
    console.log(`roomExit`)
    if (websockets.users.hasOwnProperty(ws.username)) {
      delete websockets.users[ws.username]
    }

    if (websockets.rooms[ws.room].includes(ws.username)) {
      const index = websockets.rooms[ws.room].indexOf(ws.username)
      websockets.rooms[ws.room].splice(index, 1)
    }

    if (!websockets.rooms[ws.room].length) {
      delete websockets.rooms[ws.room]
    }

    ws.terminate()
  },
  // Send room data to registered users in same room except sender
  roomUpdate: (payload) => {
    console.log(`roomUpdate`)
    if (websockets.rooms.hasOwnProperty(payload.room)) {
      websockets.rooms[payload.room].forEach((user) => {
        if (user !== payload.username) {
          websockets.users[user].send(
            JSON.stringify({
              type: `roomUpdate`,
              payload: payload,
            })
          )
        }
      })
    }
  },
  // Send message to registered users in same room
  roomDelete: (payload) => {
    console.log(`roomDelete`)
    if (websockets.rooms.hasOwnProperty(payload.room)) {
      websockets.rooms[payload.id].forEach((user) => {
        websockets.users[user].send(
          JSON.stringify({
            type: `roomDelete`,
            payload: {},
          })
        )
      })

      delete websockets.rooms[payload.room]
    }
  },
  // Send user data to registered users in same room
  userAdd: (payload) => {
    console.log(`userAdd`)
    if (websockets.rooms.hasOwnProperty(payload.room)) {
      websockets.rooms[payload.room].forEach((user) => {
        if (user !== payload.username) {
          websockets.users[user].send(
            JSON.stringify({
              type: `userAdd`,
              payload: payload,
            })
          )
        }
      })
    }
  },
  // Send user data to registered users in same room
  userRemove: (payload) => {
    console.log(`userRemove`)
    if (websockets.rooms.hasOwnProperty(payload.room)) {
      websockets.rooms[payload.room].forEach((user) => {
        if (user !== payload.username) {
          websockets.users[user].send(
            JSON.stringify({
              type: `userRemove`,
              payload: payload,
            })
          )
        }
      })
    }
  },
  // Send monster id to all registered users
  commitMessage: (payload) => {
    console.log(`commitMessage`)
    if (websockets.rooms.hasOwnProperty(payload.room)) {
      websockets.rooms[payload.room].forEach((user) => {
        if (user !== payload.username) {
          websockets.users[user].send(
            JSON.stringify({
              type: `commitMessage`,
              payload: payload,
            })
          )
        }
      })
    }
  },
}



/**
 * Export modules
 */

module.exports = {
  generateKey: generateKey,
  removeKey: removeKey,
  normalizePort: normalizePort,
  websockets: websockets,
  wsActions: wsActions,
}
