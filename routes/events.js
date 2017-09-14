var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.send('Check out all the upcoming events')
});

module.exports = router;