var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var userModel = new schema({
    firstName: { type: String },
    lastName: { type: String }
});

module.exports = mongoose.model('User', userModel);
