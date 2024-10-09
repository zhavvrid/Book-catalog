const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/all', userController.getAll);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete); 

module.exports = router;


module.exports = router