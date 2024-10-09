const Router = require('express');
const router = new Router();
const ApiError = require('../error/ApiError')
const userController = require('../controllers/userController')

router.get('/', (req, res) => {
res.json({message:'ALL WORKING!!'})
});
router.get('/:id',userController.getOne)

module.exports = router;
