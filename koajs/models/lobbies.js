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
      const tablesSQL = ctx.state.db
        .all(
          // `SELECT * FROM tables WHERE (id > $last) AND ((owner == $username) OR (instr(players, $username) > 0) OR (published == 1 AND owner != $username));`,
          // {
          //   $last: ctx.request.body.tablesLastID,
          //   $username: ctx.cookies.get(`username`),
          // }
          `SELECT * FROM tables WHERE ((owner == $username) OR (instr(players, $username) > 0) OR (published == 1 AND owner != $username));`,
          {
            $username: ctx.cookies.get(`username`),
          }
        )
        .then((data) => data)

      const charactersSQL = ctx.state.db
        .all(
          // `SELECT * FROM characters WHERE (id > $last) AND (owner == $owner);`,
          // {
          //   $last: ctx.request.body.charactersLastID,
          //   $owner: ctx.cookies.get(`username`),
          // }
          `SELECT * FROM characters WHERE (owner == $owner);`,
          {
            $owner: ctx.cookies.get(`username`),
          }
        )
        .then((data) => data)

      const monstersSQL = ctx.state.db
        .all(
          // `SELECT * FROM monsters WHERE (id > $last) AND (owner == $owner);`,
          // {
          //   $last: ctx.request.body.monstersLastID,
          //   $owner: ctx.cookies.get(`username`),
          // }
          `SELECT * FROM monsters WHERE (owner == $owner);`,
          {
            $owner: ctx.cookies.get(`username`),
          }
        )
        .then((data) => data)

      const [tables, characters, monsters] = await Promise.all(
        [
          tablesSQL,
          charactersSQL,
          monstersSQL,
        ]
      )

      const result = {
        tables: (tables) ? tables : [],
        characters: (characters) ? characters : [],
        monsters: (monsters) ? monsters : [],
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
