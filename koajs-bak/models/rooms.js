/**
 * Module dependencies
 */

// PLACEHOLDER



/**
 * Set constants
 */

// PLACEHOLDER



/**
 * Set model
 */

const Model = {
  setCookies: async (ctx, next) => {
    try {
      const room = await ctx.state.db
        .get(
          `SELECT id FROM rooms WHERE (id == $assetid);`,
          {
            $assetid: ctx.request.body.assetid,
          }
        )
        .then((data) => data)

      if (room) {
        return room
      }

      return { error: `wrong credentials` }
    }
    catch (err) {
      next(err)
    }
  },
  getOne: async (ctx, next) => {
    try {
      const room = await ctx.state.db
        .get(
          `SELECT * FROM rooms WHERE (id == $assetid);`,
          {
            $assetid: ctx.request.body.assetid,
          }
        )
        .then((data) => [data])

      if (room) {
        return room
      }

      return { error: `wrong credentials` }
    }
    catch (err) {
      next(err)
    }
  },
  getAll: async (ctx, next) => {
    try {
      const rooms = await ctx.state.db
        .all(
          `SELECT * FROM rooms WHERE ((owner == $username) OR (instr(users, $username) > 0) OR (visible == 1 AND owner != $username));`,
          {
            $username: ctx.cookies.get(`username`),
          }
        )
        .then((data) => data)

      if (rooms) {
        return rooms
      }

      return { error: `wrong credentials` }
    }
    catch (err) {
      next(err)
    }
  },
  delete: async (ctx, next) => {
    try {
      const room = await ctx.state.db
        .get(
          `SELECT id FROM rooms WHERE ((owner == $owner) AND (id == $id));`,
          {
            $owner: ctx.cookies.get(`username`),
            $id: ctx.request.body.assetid,
          }
        )
        .then((data) => data)

      if (room) {
        const result = await ctx.state.db.run(
          `DELETE FROM rooms WHERE (id == $id);`,
          {
            $id: room.id,
          }
        )

        return result
      }
    }
    catch (err) {
      next(err)
    }
  },
  getRoomMacros: async (ctx, next) => {
    try {
      const macros = await ctx.state.db
        .all(
          `SELECT * FROM macros WHERE ((room == $assetid) AND (owner == $owner));`,
          {
            $assetid: ctx.request.body.assetid,
            $owner: ctx.request.body.owner,
          }
        )
        .then((data) => data)

      if (macros) {
        return macros
      }

      return { error: `wrong credentials` }
    }
    catch (err) {
      next(err)
    }
  },
  getRoomMessages: async (ctx, next) => {
    try {
      const messages = await ctx.state.db
        .all(
          `SELECT * FROM messages WHERE (room == $assetid);`,
          {
            $assetid: ctx.request.body.assetid,
          }
        )
        .then((data) => data)

      if (messages) {
        return messages
      }

      return { error: `wrong credentials` }
    }
    catch (err) {
      next(err)
    }
  },
  updateRoomUsers: async (ctx, next) => {
    try {
      const room = await ctx.state.db
        .get(
          `SELECT id FROM rooms WHERE (id == $assetid);`,
          {
            $assetid: ctx.request.body.assetid,
          }
        )
        .then((data) => data)

      if (room) {
        await ctx.state.db
          .run(
            `UPDATE rooms SET users = $users WHERE (id == $assetid);`,
            {
              $assetid: room.id,
              $users: ctx.request.body.users,
            }
          )

        return room
      }

      return { error: `wrong credentials` }
    }
    catch (err) {
      next(err)
    }
  },
  updateRoomData: async (ctx, next) => {
    try {
      const room = await ctx.state.db
        .get(
          `SELECT id FROM rooms WHERE ((owner == $owner) AND (id == $assetid));`,
          {
            $owner: ctx.request.body.owner,
            $assetid: ctx.request.body.assetid,
          }
        )
        .then((data) => data)

      if (room) {
        await ctx.state.db
          .run(
            `UPDATE rooms SET name = $name, passcode = $passcode, maxUsers = $maxUsers, visible = $visible WHERE ((owner == $owner) AND (id == $id));`,
            {
              $owner: ctx.request.body.owner,
              $id: room.id,
              $name: ctx.request.body.name,
              $passcode: ctx.request.body.passcode,
              $maxUsers: ctx.request.body.maxUsers,
              $visible: ctx.request.body.visible,
            }
          )

        return room
      }

      return { error: `wrong credentials` }
    }
    catch (err) {
      next(err)
    }
  },
  createRoomMacros: async (ctx, next) => {
    try {
      const insert = await ctx.state.db
        .run(
          `INSERT INTO macros (room, owner, title, description, calculation) VALUES ($assetid, $owner, $title, $description, $calculation);`,
          {
            $assetid: ctx.request.body.assetid,
            $owner: ctx.request.body.owner,
            $title: ctx.request.body.title,
            $description: ctx.request.body.description,
            $calculation: ctx.request.body.calculation,
          }
        )


      let result = {
        id: false,
      }

      if (insert.stmt.changes === 1) {
        result.id = insert.stmt.lastID
      }

      return result
    }
    catch (err) {
      next(err)
    }
  },
  removeRoomMacros: async (ctx, next) => {
    try {
      const remove = await ctx.state.db.run(
        `DELETE FROM macros WHERE (id == $id);`,
        {
          $id: ctx.request.body.id,
        }
      )

      const result = (remove.stmt.changes === 1)
        ? remove
        : { stmt: { changes: 0 } }

      return result
    }
    catch (err) {
      next(err)
    }
  },
  commitMessage: async (ctx, next) => {
    try {
      const insert = await ctx.state.db
        .run(
          `INSERT INTO messages (room, owner, utc, title, text) VALUES ($assetid, $owner, $utc, $title, $text);`,
          {
            $assetid: ctx.request.body.assetid,
            $owner: ctx.request.body.owner,
            $utc: ctx.request.body.utc,
            $title: ctx.request.body.title,
            $text: ctx.request.body.text,
          }
        )

      let result = {
        id: false,
      }

      if (insert.stmt.changes === 1) {
        result.id = insert.stmt.lastID
      }

      return result
    }
    catch (err) {
      next(err)
    }
  },
}



/**
 * Export model
 */

module.exports = Model
