var mongoose = require('mongoose');

// create mongoose model for a user schema.
var User = mongoose.model('User', {
    email : {
        type: String,
        required: true,
        minlength: 10,
        trim: true
    },
});

// export model.

module.exports = {User};