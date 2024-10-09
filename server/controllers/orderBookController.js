const { OrderBook } = require('../models/models');
const ApiError = require('../error/ApiError');
class OrderBookController {
    async getAll(req, res, next) {
        try {
            const { orderId } = req.query; 
            let orders;
            if (orderId) {
                orders = await OrderBook.findAll({ where: { orderId } }); 
            } else {
                orders = await OrderBook.findAll(); 
            }
            return res.json(orders);
        } catch (e) {
            next(ApiError.internal('Ошибка при получении заказов', e));
        }
    }
    async getBooksForOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            let orderBooks;
            if (orderId) {
                orderBooks = await OrderBook.findAll({ where: { orderId }});
            } else {
                orderBooks = await OrderBook.findAll();
            }
            return res.json(orderBooks);
        } catch (e) {
            next(ApiError.internal('Ошибка при получении книг для заказа', e));
        }
    }
    
    
}
module.exports = new OrderBookController();

