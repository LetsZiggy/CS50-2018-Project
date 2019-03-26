/**
 * Module dependencies
 */

const Router = require('koa-router')
const Ctrl = require('../controllers/monsters')



/**
 * Set constants
 */

const router = new Router()



/**
 * Set routes
 */

router.post(`/:route`, Ctrl.checkToken)
router.post(`/setCookies`, Ctrl.setCookies)
router.post(`/getAll`, Ctrl.getAll)
router.post(`/delete`, Ctrl.delete)
router.post(`/update`, Ctrl.update)



/**
 * Export router
 */

module.exports = router.routes()
