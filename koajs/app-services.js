/**
 * Create random string and remove key from array
 */

const characters = [
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
      key.push(characters[index])
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

const websockets = { users: {}, tables: {} }



/**
 * Set Websocket actions
 */

const wsActions = {
  // Register user to websockets
  tableEnter: (ws, payload) => {
    console.log(`tableEnter`)
    ws.username = payload.username
    ws.table = payload.table
    websockets.users[payload.username] = ws
    websockets.tables[payload.table] =
      (!Array.isArray(websockets.tables[payload.table]))
        ? [payload.username]
        : (!websockets.tables[payload.table].includes(payload.username))
          ? [...websockets.tables[payload.table], payload.username]
          : [...websockets.tables[payload.table]]
  },
  // Remove user from websockets
  tableExit: (ws, payload) => {
    console.log(`tableExit`)
    if (websockets.users.hasOwnProperty(ws.username)) {
      delete websockets.users[ws.username]
    }

    if (websockets.tables[ws.table].includes(ws.username)) {
      const index = websockets.tables[ws.table].indexOf(ws.username)
      websockets.tables[ws.table].splice(index, 1)
    }

    if (!websockets.tables[ws.table].length) {
      delete websockets.tables[ws.table]
    }

    ws.terminate()
  },
  // Send table data to registered users in same table except sender
  tableUpdate: (payload) => {
    console.log(`tableUpdate`)
    if (websockets.tables.hasOwnProperty(payload.table)) {
      websockets.tables[payload.table].forEach((user) => {
        if (user !== payload.username) {
          websockets.users[user].send(
            JSON.stringify({
              type: `tableUpdate`,
              payload: payload,
            })
          )
        }
      })
    }
  },
  // Send message to registered users in same table
  tableDelete: (payload) => {
    console.log(`tableDelete`)
    if (websockets.tables.hasOwnProperty(payload.id)) {
      websockets.tables[payload.id].forEach((user) => {
        websockets.users[user].send(
          JSON.stringify({
            type: `tableDelete`,
            payload: {},
          })
        )
      })

      delete websockets.tables[payload.table]
    }
  },
  // Send character data to registered users in same table
  characterAdd: (payload) => {
    console.log(`characterAdd`)
    if (websockets.tables.hasOwnProperty(payload.table)) {
      websockets.tables[payload.table].forEach((user) => {
        if (user !== payload.username) {
          websockets.users[user].send(
            JSON.stringify({
              type: `characterAdd`,
              payload: payload,
            })
          )
        }
      })
    }
  },
  // Send character data to registered users in same table
  characterRemove: (payload) => {
    console.log(`characterRemove`)
    if (websockets.tables.hasOwnProperty(payload.table)) {
      websockets.tables[payload.table].forEach((user) => {
        if (user !== payload.username) {
          websockets.users[user].send(
            JSON.stringify({
              type: `characterRemove`,
              payload: payload,
            })
          )
        }
      })
    }
  },
  // Send character data to all registered users
  characterUpdate: (payload) => {
    console.log(`characterUpdate`)
    Object.keys(websockets.tables).forEach((table) => {
      websockets.tables[table].forEach((user) => {
        websockets.users[user].send(
          JSON.stringify({
            type: `characterUpdate`,
            payload: payload,
          })
        )
      })
    })
  },
  // Send character id to all registered users
  characterDelete: (payload) => {
    console.log(`characterDelete`)
    Object.keys(websockets.tables).forEach((table) => {
      websockets.tables[table].forEach((user) => {
        websockets.users[user].send(
          JSON.stringify({
            type: `characterDelete`,
            payload: payload,
          })
        )
      })
    })
  },
  // Send monster data to registered users in same table
  monsterAdd: (payload) => {
    console.log(`monsterAdd`)
    if (websockets.tables.hasOwnProperty(payload.table)) {
      websockets.tables[payload.table].forEach((user) => {
        websockets.users[user].send(
          JSON.stringify({
            type: `monsterAdd`,
            payload: payload,
          })
        )
      })
    }
  },
  // Send monster data to registered users in same table
  monsterRemove: (payload) => {
    console.log(`monsterRemove`)
    if (websockets.tables.hasOwnProperty(payload.table)) {
      websockets.tables[payload.table].forEach((user) => {
        websockets.users[user].send(
          JSON.stringify({
            type: `monsterRemove`,
            payload: payload,
          })
        )
      })
    }
  },
  // Send monster data to all registered users
  monsterUpdate: (payload) => {
    console.log(`monsterUpdate`)
    Object.keys(websockets.tables).forEach((table) => {
      console.log(table)
      websockets.tables[table].forEach((user) => {
        websockets.users[user].send(
          JSON.stringify({
            type: `monsterUpdate`,
            payload: payload,
          })
        )
      })
    })
  },
  // Send monster id to all registered users
  monsterDelete: (payload) => {
    console.log(`monsterDelete`)
    Object.keys(websockets.tables).forEach((table) => {
      websockets.tables[table].forEach((user) => {
        websockets.users[user].send(
          JSON.stringify({
            type: `monsterDelete`,
            payload: payload,
          })
        )
      })
    })
  },
  // Send monster id to all registered users
  commitMessage: (payload) => {
    console.log(`commitMessage`)
    if (websockets.tables.hasOwnProperty(payload.table)) {
      websockets.tables[payload.table].forEach((user) => {
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
