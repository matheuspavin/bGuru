'use strict';
const router = require('express').Router();
const ordersService = require('../services/ordersService');

router.get('/', async function (req, res, next) {
    const user = req.user;
    try {
        let result = await ordersService.getAll();
        return res.json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/', async function(req, res, next){
    var order = req.body;
    try {
        let result = await ordersService.insertOrder(order);
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.delete('/:orderId', async function(req, res, next){
    var orderId = req.params.orderId;
    try {
        let result = await ordersService.deleteOrderById(orderId);
        res.send(result);    
    } catch (error) {
        next(error);
    }
    
});

router.get('/:orderId', async function(req, res, next){
    var orderId = req.params.orderId;
    try {
        let result = await ordersService.getOrderById(orderId);
        return res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/company/:companyName', async function(req, res, next){
    var companyName = req.params.companyName;
    try {
        let result = await ordersService.getOrdersByCompany(companyName);
        return res.json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/address', async function(req, res, next){
    var body = req.body;
    try {
        let result = await ordersService.getOrdersByAddress(body.customerAdress);
        return res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/itens/orderedItens', async function (req, res, next) {
    try {
        let result = await ordersService.getOrderedItens();
        return res.json(result);
    } catch (error) {
        next(error);
    }
});


module.exports = router;