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

module.exports = router;