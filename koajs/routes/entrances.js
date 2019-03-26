/**
 * Module dependencies
 */

const Router = require('koa-router')
const Ctrl = require('../controllers/entrances')



/**
 * Set constants
 */

const router = new Router()



/**
 * Set routes
 */

router.post(`/:route`, Ctrl.checkToken)
router.post(`/check`, Ctrl.checkUsername)
router.post(`/signout`, Ctrl.signout)
router.post(`/signin`, Ctrl.signin)
router.post(`/register`, Ctrl.register)
router.post(`/reset`, Ctrl.reset)



/**
 * Export router
 */

module.exports = router.routes()
