/**
 * Module dependencies
 */

const Router = require('koa-router')
const Ctrl = require('../controllers/tables')



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
router.post(`/getCurrentTableData`, Ctrl.getCurrentTableData)
router.post(`/updateTablesListMonsters`, Ctrl.updateTablesListMonsters)
router.post(`/updateTablesListCharacters`, Ctrl.updateTablesListCharacters)
router.post(`/updateTableData`, Ctrl.updateTableData)
router.post(`/updateCharacterInfo`, Ctrl.updateCharacterInfo)
router.post(`/commitMessage`, Ctrl.commitMessage)



/**
 * Export router
 */

module.exports = router.routes()
