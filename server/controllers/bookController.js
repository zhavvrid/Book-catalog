const uuid = require('uuid')
const path = require('path')
const {Book,BookInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class BookController{
    async create(req,res,next){
        try{
            const {title,price,authorId,janrId,publicationYear,info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname,'..','static',fileName))

        if (info){
            info = JSON.parse(info)
            info.forEach(i=>
                BookInfo.create({
                    title: i.title,
                    description: i.description,
                    bookId: i.bookId
                })
            )
        }
        const book = await Book.create({title, price, authorId, janrId, publicationYear, img:fileName})
        return res.json(book)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        const {janrId, authorId,limit,page,id} = req.query
        let pageNumber = page || 1; 
        let limitNumber = limit || 9;
        let offset = pageNumber * limitNumber - limitNumber;
        let books;
        if (!janrId && !authorId){
            books = await Book.findAndCountAll({id,limit,offset})
        }
        if (janrId && !authorId){
            books = await Book.findAndCountAll({where:{janrId},limit,offset})    
        }
        if (!janrId && authorId){
            books = await Book.findAndCountAll({where:{authorId},limit,offset})
        }
        if (janrId && authorId){
            books = await Book.findAndCountAll({where:{janrId,authorId},limit,offset})
        }
        return res.json(books)
    }
    async getOne(req,res){
        const {id} = req.params
        const book = await Book.findOne({ where: { id }, include: [{model:BookInfo,as:'info'}] })
        return res.json(book)
    }
    
}

module.exports = new BookController()
