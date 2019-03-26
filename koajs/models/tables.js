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
      const table = await ctx.state.db
        .get(
          `SELECT id FROM tables WHERE (id == $assetid);`,
          {
            $assetid: ctx.request.body.assetid,
          }
        )
        .then((data) => data)

      if (table) {
        return table
      }

      return { error: `wrong credentials` }
    } catch (err) {
      next(err)
    }
  },
  getOne: async (ctx, next) => {
    try {
      const table = await ctx.state.db
        .get(
          `SELECT * FROM tables WHERE (id == $id);`,
          {
            $id: ctx.request.body.id,
          }
        )
        .then((data) => [data])

      if (table) {
        return table
      }

      return { error: `wrong credentials` }
    } catch (err) {
      next(err)
    }
  },
  getAll: async (ctx, next) => {
    try {
      const tables = await ctx.state.db
        .all(
          `SELECT * FROM tables WHERE ((owner == $username) OR (instr(players, $username) > 0) OR (published == 1 AND owner != $username));`,
          {
            $username: ctx.cookies.get(`username`),
          }
        )
        .then((data) => data)

      if (tables) {
        return tables
      }

      return { error: `wrong credentials` }
    } catch (err) {
      next(err)
    }
  },
  getCurrentTableData: async (ctx, next) => {
    try {
      let charactersSQL = null

      if (ctx.request.body.charactersIDs !== null) {
        // https://stackoverflow.com/a/45750516
        charactersSQL = ctx.state.db
          // .all(
          //     `SELECT * FROM characters WHERE id IN ($charactersIDs);`,
          //     {
          //       $charactersIDs: ctx.request.body.charactersIDs,
          //     }
          //   )
          .all(`SELECT * FROM characters WHERE id IN (${ctx.request.body.charactersIDs});`)
          .then((data) => data)
      }
      else {
        charactersSQL = Promise.resolve(false)
      }

      let monstersSQL = null

      if (ctx.request.body.monstersIDs !== null) {
        // https://stackoverflow.com/a/45750516
        monstersSQL = ctx.state.db
          // .all(
          //   `SELECT * FROM monsters WHERE (id IN ($monstersIDs));`,
          //   {
          //     $monstersIDs: ctx.request.body.monstersIDs,
          //   }
          // )
          .all(`SELECT * FROM monsters WHERE (id IN (${ctx.request.body.monstersIDs}));`)
          .then((data) => data)
      }
      else {
        monstersSQL = Promise.resolve(false)
      }

      const messagesSQL = ctx.state.db
        // .all(
        //   `SELECT * FROM messages WHERE (tableID == $tableID);`,
        //   {
        //     $tableID: ctx.request.body.tableID,
        //   }
        // )
        .all(
          `SELECT * FROM messages WHERE (tableID == $tableID);`,
          {
            $tableID: ctx.request.body.tableID,
          }
        )
        .then((data) => data)

      const [characters, monsters, messages] = await Promise.all(
        [
          charactersSQL,
          monstersSQL,
          messagesSQL,
        ]
      )

      const result = {
        characters: (characters) ? characters : [],
        monsters: (monsters) ? monsters : [],
        messages: (messages) ? messages : [],
      }

      return result
    } catch (err) {
      next(err)
    }
  },
  delete: async (ctx, next) => {
    try {
      const table = await ctx.state.db
        .get(
          `SELECT id FROM tables WHERE ((owner == $owner) AND (id == $id));`,
          {
            $owner: ctx.cookies.get(`username`),
            $id: ctx.request.body.assetid,
          }
        )
        .then((data) => data)

      if (table) {
        const result = await ctx.state.db.run(
          `DELETE FROM tables WHERE (id == $id);`,
          {
            $id: table.id,
          }
        )

        return result
      }

    } catch (err) {
      next(err)
    }
  },
  updateTablesListMonsters: async (ctx, next) => {
    try {
      const table = await ctx.state.db
        .get(
          `SELECT id FROM tables WHERE (id == $assetid);`,
          {
            $assetid: ctx.request.body.assetid,
          }
        )
        .then((data) => data)

      if (table) {
        const result = await ctx.state.db
          .run(
            `UPDATE tables SET monstersIDs = $monstersIDs, monstersData = $monstersData WHERE (id == $assetid);`,
            {
              $assetid: table.id,
              $monstersIDs: ctx.request.body.monstersIDs,
              $monstersData: ctx.request.body.monstersData,
            }
          )

        return table
      }

      return { error: `wrong credentials` }
    }
    catch (err) {
      next(err)
    }
  },
  updateTablesListCharacters: async (ctx, next) => {
    try {
      const table = await ctx.state.db
        .get(
          `SELECT id FROM tables WHERE (id == $assetid);`,
          {
            $assetid: ctx.request.body.assetid,
          }
        )
        .then((data) => data)

      if (table) {
        const result = await ctx.state.db
          .run(
            `UPDATE tables SET players = $players, charactersIDs = $charactersIDs, charactersData = $charactersData WHERE (id == $assetid);`,
            {
              $assetid: table.id,
              $players: ctx.request.body.players,
              $charactersIDs: ctx.request.body.charactersIDs,
              $charactersData: ctx.request.body.charactersData,
            }
          )

        return table
      }

      return { error: `wrong credentials` }
    }
    catch (err) {
      next(err)
    }
  },
  updateTableData: async (ctx, next) => {
    try {
      const table = await ctx.state.db
        .get(
          `SELECT id FROM tables WHERE ((owner == $owner) AND (id == $id));`,
          {
            $owner: ctx.request.body.owner,
            $id: ctx.request.body.table,
          }
        )
        .then((data) => data)

      if (table) {
        const result = await ctx.state.db
          .run(
            `UPDATE tables SET name = $name, passcode = $passcode, maxPlayers = $maxPlayers, published = $published WHERE ((owner == $owner) AND (id == $id));`,
            {
              $owner: ctx.request.body.owner,
              $id: table.id,
              $name: ctx.request.body.name,
              $passcode: ctx.request.body.passcode,
              $maxPlayers: ctx.request.body.maxPlayers,
              $published: ctx.request.body.published,
            }
          )

        return table
      }

      return { error: `wrong credentials` }
    }
    catch (err) {
      next(err)
    }
  },
  updateCharacterInfo: async (ctx, next) => {
    try {
      const character = await ctx.state.db
        .get(
          `SELECT id FROM characters WHERE ((owner == $owner) AND (id == $id));`,
          {
            $owner: ctx.request.body.owner,
            $id: ctx.request.body.character,
          }
        )
        .then((data) => data)

      if (character) {
        const result = await ctx.state.db
          .run(
            `UPDATE characters SET  xp = $xp, xpNextLevel = $xpNextLevel, coinCopper = $coinCopper, coinSilver = $coinSilver, coinElectrum = $coinElectrum, coinGold = $coinGold, coinPlatinum = $coinPlatinum, notes = $notes WHERE ((owner == $owner) AND (id == $id));`,
            {
              $owner: ctx.request.body.owner,
              $id: character.id,
              $xp: ctx.request.body.xp,
              $xpNextLevel: ctx.request.body.xpNextLevel,
              $coinCopper: ctx.request.body.coinCopper,
              $coinSilver: ctx.request.body.coinSilver,
              $coinElectrum: ctx.request.body.coinElectrum,
              $coinGold: ctx.request.body.coinGold,
              $coinPlatinum: ctx.request.body.coinPlatinum,
              $notes: ctx.request.body.notes,
            }
          )

        return character
      }

      return { error: `wrong credentials` }
    }
    catch (err) {
      next(err)
    }
  },
  commitMessage: async (ctx, next) => {
    try {
      // const insert = await ctx.state.db
      //   .run(
      //     `INSERT INTO messages (tableID, username, senderID, senderName, type, text, action) VALUES ($tableID, $username, $senderID, $senderName, $type, $text, $action);`,
      //     {
      //       $tableID: ctx.request.body.table,
      //       $username: ctx.request.body.username,
      //       $senderID: ctx.request.body.senderID,
      //       $senderName: ctx.request.body.senderName,
      //       $type: ctx.request.body.type,
      //       $text: ctx.request.body.text,
      //       $action: ctx.request.body.action,
      //     }
      //   )

      let result = {
        id: false,
      }

      // if (insert.stmt.changes === 1) {
      //   result.id = insert.stmt.lastID
      // }

      result.id = true

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
