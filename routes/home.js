var express = require('express');
var router = express.Router();

router

.get('/', function(req, res, next) {
	res.send('Welcome to the home page')
})

.get('/home', function(req, res, next) {
	res.send('Welcome to the home page')
});

module.exports = router;