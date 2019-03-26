/**
 * Module dependencies
 */

const bcrypt = require('bcrypt')



/**
 * Set constants
 */

const SALT_ROUNDS = 10



/**
 * Set model
 */

const Model = {
  checkUsername: async (ctx, next) => {
    try {
      // https://stackoverflow.com/questions/9755860/valid-query-to-check-if-row-exists-in-sqlite3#comment29259314_9756276
      const user = await ctx.state.db
        .get(
          `SELECT EXISTS (SELECT id FROM users WHERE (username == $username) LIMIT 1) AS taken;`,
          {
            $username: ctx.request.body.username,
          }
        )

      return user
    }
    catch (err) {
      next(err)
    }
  },
  signin: async (ctx, next) => {
    try {
      const user = await ctx.state.db
        .get(
          `SELECT * FROM users WHERE (username == $username);`,
          {
            $username: ctx.request.body.username,
          }
        )

      if (user) {
        const check = await bcrypt.compare(ctx.request.body.password, user.hash_password)

        if (check) {
          return user
        }
      }

      return { error: `wrong credentials` }
    }
    catch (err) {
      next(err)
    }
  },
  register: async (ctx, next) => {
    try {
      const check = await ctx.state.db
        .get(
          `SELECT id FROM users WHERE (username == $username);`,
          {
            $username: ctx.request.body.username,
          }
        )

      if (!check) {
        const hashPassword = await bcrypt.hash(ctx.request.body.password, SALT_ROUNDS)
        const hashEmail = await bcrypt.hash(ctx.request.body.email, SALT_ROUNDS)

        const register = await ctx.state.db
          .run(
            `INSERT INTO users (username, hash_password, hash_email) VALUES ($username, $hashPassword, $hashEmail);`,
            {
              $username: ctx.request.body.username,
              $hashPassword: hashPassword,
              $hashEmail: hashEmail,
            }
          )

        let user = {
          id: false,
          username: null,
        }

        if (register.stmt.changes === 1) {
          user.id = register.stmt.lastID
          user.username = ctx.request.body.username
        }

        return user
      }

      return { error: `username taken` }
    }
    catch (err) {
      next(err)
    }
  },
  reset: async (ctx, next) => {
    try {
      const user = await ctx.state.db
        .get(
          `SELECT * FROM users WHERE (username == $username);`,
          {
            $username: ctx.request.body.username,
          }
        )

      if (user) {
        const check = await bcrypt.compare(ctx.request.body.email, user.hash_email)

        if (check) {
          const hashPassword = await bcrypt.hash(ctx.request.body.password, SALT_ROUNDS)

          await ctx.state.db
            .run(
              `UPDATE users SET hash_password = $hashPassword WHERE (id == $id);`,
              {
                $hashPassword: hashPassword,
                $id: user.id,
              }
            )

          return user
        }
      }

      return { error: `wrong credentials` }
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
