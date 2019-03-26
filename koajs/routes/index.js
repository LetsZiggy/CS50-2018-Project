/**
 * Set and export list of routes
 */

module.exports = (router) => {
  router.use(`/entrance`, require(`./entrances`))
  router.use(`/lobby`, require(`./lobbies`))
  router.use(`/table`, require(`./tables`))
  router.use(`/character`, require(`./characters`))
  router.use(`/monster`, require(`./monsters`))
}
