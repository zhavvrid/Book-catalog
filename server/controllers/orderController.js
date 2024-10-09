const { Order, Book, OrderBook } = require('../models/models');
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

class OrderController {
    async create(req, res, next) {
        try {
            const { userId, bookId, quantity, price } = req.body;
            if (!userId || !bookId || !quantity || !price) {
                throw ApiError.badRequest('Необходимо указать идентификатор пользователя, идентификатор книги, количество и цену');
            }
            const order = await Order.create({ userId });
            await OrderBook.create({ orderId: order.id, bookId, quantity, price });

            const book = await Book.findOne({ where: { id: bookId } });
            order.dataValues.book = book;
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const { userId } = req.query; 
            let orders;
            if (userId) {
                orders = await Order.findAll({ where: { userId } }); 
            } else {
                orders = await Order.findAll(); 
            }
            return res.json(orders);
        } catch (e) {
            next(ApiError.internal('Ошибка при получении заказов', e));
        }
    }
    
    async getOne(req, res, next) {
        try {
            const { userId } = req.params;
            const order = await Order.findOne({ where: { userId } });
            if (!order) {
                throw ApiError.notFound('Заказ с указанным идентификатором не найден');
            }
            return res.json(order);
        } catch (e) {
            next(ApiError.internal('Ошибка при получении заказа', e));
        }
    }    

    
}

module.exports = new OrderController();
