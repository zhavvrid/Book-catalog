const {Author} = require('../models/models')
const ApiError = require('../error/ApiError')

class AuthorController{
    async create(req,res){
        const {firstName} = req.body
        const author=await Author.create({firstName})
        return res.json(author) 
        //Добавить другие поля
    }
    async getAll(req,res){
        const authors = await Author.findAll()
        return res.json(authors)
    }
}

module.exports = new AuthorController()
