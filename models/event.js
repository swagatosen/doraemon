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
	}, 

	eventLocation: {
		type: String
	}

	eventCategory: {
		category1: {
		type: String
		},

		category2: {
			type: String
		},

		category3: {
			type: String
		}
	}
});


var Event = module.exports = mongoose.model('Event', event);

module.exports.CreateEvent = function(eventDetails, callback) {
	try {
		if (ValidateEventDetails(eventDetails)) {
			var e = new Event({
				eventName: eventDetails.eventName,
				eventDateTime: eventDetails.eventDateTime,
				quota: eventDetails.quota,
				description: eventDetails.description,
				quota: eventDetails.quota,
				usersSignedup: []
			});

			e.save(function(err) {
				if(err) {
					console.error(err);
					var result = {
						result: 'error',
						message: err
					}
					return callback(result);
				}
				var result = {
					result: 'success',
					message: 'event created successfully.'
				}
				return callback(result);
			})
		}
	}
}

module.exports.UpdateEvent = function(eventId, eventDetails, callback) {
	try {
		Event.findById(eventId, function(err, e, callback) {
			if (e) {
				if(ValidateEventDetails(eventDetails)) {
					e.update(function(err, eventDetails, callback) {
						if(err) {
							console.error(err);
							var result = {
								result: 'error',
								message: err
							}
							return callback(result);
						}
						var result = {
							result: 'success',
							message: 'event updated successfully.'
						}
						return callback(result);
					})
				}
			}
		})
	}
}

module.exports.GetEventList = function(filters) {
	Event.find(filters).exec()

	.then(function(events) {
		console.log(events);
		return events;
	})

	.catch(function(err) {
		console.log(err);
	});
}

module.exports.GetEvent = function (eventId, callback) {
	if (callback) {
		Event.findOne({_id: eventId}, function(err, event) {
			if (err){
				console.error(err);
				return callback(err, null);
			}

			// no errors.

			return callback(null, event)
		})
	}

	else {
		return new Promise(function(resolve, reject) {
			Event.findOne({_id: eventId}, function(err, event) {
				if (err){
					console.error(err);
					return reject(err);
				}

				// no errors.

				return resolve(event)
			})
		})
	}
}

function CheckIfEventExists(eventId, callback) {
	if (callback) {
		Event.findOne({_id: eventId}, 'eventName', function(err, event) {
			if (err) {
				console.error(err);
				return callback(err, null);
			}

			// no errors. check if event exists
			var found = false;
			if (event == null) {}
			else found = true;

			return callback(null, found);
		}
	}

	else {
		return new Promise(function(resolve, reject) {
			Event.findOne({_id: eventId}, function(err, event) {
				if (err){
					console.error(err);
					return reject(err);
				}

				// no errors. check if event exists
				var found = false;
				if (event == null) {}
				else found = true;

				return resolve(found);
			})
		})
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

			return valid;
		}

	catch (err) {
		console.log(err);
	}
}