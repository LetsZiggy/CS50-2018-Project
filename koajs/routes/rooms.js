/**
 * Module dependencies
 */

const Router = require('koa-router')
const Ctrl = require('../controllers/rooms')



/**
 * Set constants
 */

const router = new Router()



/**
 * Set routes
 */

router.post(`/:route`, Ctrl.checkToken)
router.post(`/setCookies`, Ctrl.setCookies)
router.post(`/getOne`, Ctrl.getOne)
router.post(`/getAll`, Ctrl.getAll)
router.post(`/delete`, Ctrl.delete)
router.post(`/getRoomMacros`, Ctrl.getRoomMacros)
router.post(`/getRoomMessages`, Ctrl.getRoomMessages)
router.post(`/updateRoomUsers`, Ctrl.updateRoomUsers)
router.post(`/updateRoomData`, Ctrl.updateRoomData)
router.post(`/createRoomMacros`, Ctrl.createRoomMacros)
router.post(`/removeRoomMacros`, Ctrl.removeRoomMacros)
router.post(`/commitMessage`, Ctrl.commitMessage)



/**
 * Export router
 */

module.exports = router.routes()
