var mongoose = require('mongoose')

var modelEvents = mongoose.Schema(
{
	eventName: {
		type: String,
		required: true
	},
	eventDateTime: {
		type: Date,
		required: true
	},
	quota: Number, 
	description: {
		type: String,
	},
	creators: {
		type: [String],
		required: true
	},
	usersSignedup: {
		userid: [Schema.Types.ObjectId],
		signupTime: Date,
		status: String
	}

});


module.exports = MovieSchema;
