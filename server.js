var express = require('express'),
  app = express(),
  port = process.env.PORT || 3500;
const bodyParser = require('body-parser');

const ordersRoute = require('./routes/ordersRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
	next();
});

app.use('/orders', ordersRoute);

app.listen(port);

console.log('API started on: ' + port);