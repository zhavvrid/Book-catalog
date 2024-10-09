const {Janr} = require('../models/models')
const ApiError = require('../error/ApiError')

class JanrController{
    async create(req,res){
        const {name} = req.body
        const janr=await Janr.create({name})
        return res.json(janr)
    }
    async getAll(req,res){
        const janres = await Janr.findAll()
        return res.json(janres)
    }
}

module.exports = new JanrController()
