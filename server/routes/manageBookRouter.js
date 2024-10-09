const Router = require('express')
const router = new Router()
const bookController = require('../controllers/bookController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', bookController.getAll)
router.get('/:id',bookController.getOne)

module.exports = router