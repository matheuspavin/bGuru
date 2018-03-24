const router = require('express').Router();
const ordersService = require('../services/ordersService');

router.get('/', async function (req, res, next) {
    const user = req.user;
    let result = await ordersService.getAll();
    return res.json(result);
});

router.post('/', async function(req, res){
    var order = req.body;
    let result = await ordersService.insertOrder(order);
	res.send(result);
});

module.exports = router;