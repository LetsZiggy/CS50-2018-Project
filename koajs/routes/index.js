/**
 * Set and export list of routes
 */

module.exports = (router) => {
  router.use(`/entrance`, require(`./entrances`))
  router.use(`/lobby`, require(`./lobbies`))
  router.use(`/room`, require(`./rooms`))
}
