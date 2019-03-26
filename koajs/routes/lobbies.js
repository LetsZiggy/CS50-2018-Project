/**
 * Module dependencies
 */

const Router = require('koa-router')
const Ctrl = require('../controllers/lobbies')



/**
 * Set constants
 */

const router = new Router()



/**
 * Set routes
 */

router.post(`/:route`, Ctrl.checkToken)
router.post(`/getAll`, Ctrl.getAll)
router.post(`/create`, Ctrl.create)



/**
 * Export router
 */

module.exports = router.routes()
