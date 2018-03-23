const router = require('express').Router();

router.get('/', async function (req, res, next) {
    const user = req.user;
    let result = {
        test: 'ok'
    }
	// let result = await garageService.getGarages();
    return res.json(result);
});

router.post('/', function(req, res){
	var order = req.body;
	res.send(user);
});

module.exports = router;