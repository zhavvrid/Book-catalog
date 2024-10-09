const Router = require('express');
const router = new Router();
const ApiError = require('../error/ApiError')


router.get('/', (req, res) => {
res.json({message:'ALL WORKING!!'})
});

module.exports = router;
