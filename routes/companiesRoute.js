'use strict';
const router = require('express').Router();
const companiesService = require('../services/companiesService');

router.get('/', async function (req, res, next) {
    const user = req.user;
    try {
        let result = await companiesService.getAll();
        return res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/company/name/:companyName', async function(req, res, next){
    var companyName = req.params.companyName;
    try {
        let result = await companiesService.getCompanyByName(companyName);
        return res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/company/id/:idCompany', async function(req, res, next){
    var idCompany = req.params.idCompany;
    try {
        let result = await companiesService.getCompanyById(idCompany);
        return res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/amount/:idCompany', async function(req, res, next){
    var idCompany = req.params.idCompany;
    try {
        let result = await companiesService.getAmountOfMoneyByCompany(idCompany);
        return res.json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/orderedItem', async function(req, res, next){
    var body = req.body;
    try {
        let result = await companiesService.getOrdersByItem(body.orderedItem);
        return res.json(result);
    } catch (error) {
        next(error);
    }
});


router.post('/', async function(req, res, next){
    var company = req.body;
    try {
        let result = await companiesService.insertCompany(company);
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.put('/:companyId', async function(req, res, next){
    var companyId = req.params.companyId;
    var company = req.body;
    try {
        let result = await companiesService.updateCompany(companyId, company);
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.delete('/:companyId', async function(req, res, next){
    var companyId = req.params.companyId;
    try {
        let result = await companiesService.deleteCompanyById(companyId);
        res.send(result);    
    } catch (error) {
        next(error);
    }
    
});

module.exports = router;