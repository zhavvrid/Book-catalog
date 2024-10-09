const Router = require('express')
const router = new Router()
const janrController = require('../controllers/janrController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), janrController.create)
router.get('/',janrController.getAll) 

module.exports = router 