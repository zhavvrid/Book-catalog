const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController')
const orderBookController = require('../controllers/orderBookController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', orderBookController.getAll)
router.get('/:orderId', orderBookController.getBooksForOrder)

module.exports = router;
