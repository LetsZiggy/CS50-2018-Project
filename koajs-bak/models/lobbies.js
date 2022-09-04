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
  getAll: async (ctx, next) => {
    try {
      const roomsSQL = ctx.state.db
        .all(
          // `SELECT * FROM rooms WHERE (id > $last) AND ((owner == $username) OR (instr(users, $username) > 0) OR (visible == 1 AND owner != $username));`,
          // {
          //   $last: ctx.request.body.roomsLastID,
          //   $username: ctx.cookies.get(`username`),
          // }
          `SELECT * FROM rooms WHERE ((owner == $username) OR (instr(users, $username) > 0) OR (visible == 1 AND owner != $username));`,
          {
            $username: ctx.cookies.get(`username`),
          }
        )
        .then((data) => data)

      const [rooms] = await Promise.all(
        [
          roomsSQL,
        ]
      )

      const result = {
        rooms: (rooms) ? rooms : [],
      }

      return result
    }
    catch (err) {
      next(err)
    }
  },
  create: async (ctx, next) => {
    try {
      const modelType = ctx.request.body.modelType
        .toLowerCase()
        .replace(/(^[a-z])/g, match => match.toUpperCase())

      const create = await ctx.state.db
        .run(
          `INSERT INTO ${ctx.request.body.modelType}s (owner, name) VALUES ($owner, $name);`,
          {
            $owner: ctx.cookies.get(`username`),
            $name: `${modelType} Name`,
          }
        )

      let result = {
        id: false,
      }

      if (create.stmt.changes === 1) {
        result.id = create.stmt.lastID
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
