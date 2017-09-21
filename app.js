var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// routes 
var home = require('./routes/home');
var events = require('./routes/events');
var portNum = 3000;

var app = express();

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


// set static folder for angular stuff
app.use(express.static(path.join(__dirname, 'client')));

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// define route handlers
app.use('/', home);
app.use('/events', events);

// error handling
if (app.get('env') === 'development') {

	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		})
	});
} else {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}

app.listen(portNum, function() {
	console.log('Server started on port ' + portNum);
})

