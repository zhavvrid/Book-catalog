const sequelize = require('../db')
const {DataTypes}=require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER},
    img: {type: DataTypes.STRING, allowNull: false},
    publicationYear: {type: DataTypes.INTEGER, allowNull: false},
    stockQuantity: {type: DataTypes.INTEGER, defaultValue: 0},
})

const OrderBook = sequelize.define('order_book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity:{type: DataTypes.INTEGER},
    price:{type: DataTypes.DECIMAL}
})

const Janr= sequelize.define('janr', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Author= sequelize.define('author', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING, unique: true},
    lastName: {type: DataTypes.STRING, unique: true},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const BookInfo = sequelize.define('book_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false},
})

const JanrAuthor = sequelize.define('janr_author',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Book, { through: OrderBook });
Book.belongsToMany(Order, { through: OrderBook });

User.hasMany(Rating)
Rating.belongsTo(User)

Janr.hasMany(Book)
Book.belongsTo(Janr)

Author.hasMany(Book)
Book.belongsTo(Author)

Book.hasMany(Rating)
Rating.belongsTo(Book)

Book.hasMany(BookInfo, {as: 'info'});
BookInfo.belongsTo(Book)

Janr.belongsToMany(Author, {through: JanrAuthor })
Author.belongsToMany(Janr, {through: JanrAuthor })

module.exports = {
    User,
    Book,
    Order,
    Janr,
    Author,
    Rating,
    BookInfo,
    OrderBook
}



