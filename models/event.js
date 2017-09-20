var mongoose = require('mongoose')

var event = mongoose.Schema(
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


module.exports = mongoose.model('Event', event);

module.exports.CreateEvent = function(eventDetails, callback) {
	try {

	}
}

function ValidateEventDetails(event) {
	var valid = true;
	try {
			if (event.eventName.trim() == "") {
				valid = false;

			}

			else if (isNaN(event.eventDateTime.getTime())) {
				valid = false;
			}

			else if (isNaN(parseInt(quota) && quota >= 0)) {
				valid = false;
			}
		}
	}
}