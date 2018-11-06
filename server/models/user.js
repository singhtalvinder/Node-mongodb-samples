const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// schema for User.
var userSchema =  new mongoose.Schema({
    email : {
        type: String,
        required: true,
        minlength: 10,
        trim: true,
        unique: true,
        validate: {
            // alternate way
            //validator: (value) => {
            //    return validator.isEmail(value);
            //},
            // or 
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    }, 
    tokens: [{
        access: {
            type: String,
            required:true
        },
        token: {
            type: String,
            required: true
        }
    }]
});


// Override the method to control how the mongoose model data is returned
// back in JSON. 
// Generally we will not be returning any password or such kind of data 
// so we will restrict it here !!
userSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject(); // mongoose user object to regular object.
    return _.pick(userObject, ['_id', 'email']); 
};



// These are methods weadd to the schema to manipulate data.
userSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'mysecret123').toString();

    console.log(' inside generateAuth ...:', token);
    // Add to the user tokens array as defined above.
    user.tokens = user.tokens.concat([{access, token}]);
    //user.tokens.push({access, token});

    // save 
    return user.save().then(()=> {
        return token;
    });
};

userSchema.statics.findByToken = function(token) {
    // this refers to the model.
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token,'mysecret123');

    }catch(e) {
        // return promise that always rejects.
        //return new Promise((resolve, reject) =>{
        //    reject();
        //});
        // Or simply
        return Promise.reject();
    }

    // find user if everything is ok.
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
    
};

userSchema.statics.findByCredentials = function(email, password) {
    var User = this;
    return User.findOne({email}).then((user) =>{
        if(!user) {
            // return rejected promise
            return Promise.reject();
        }
        // bcrypt only supports callbacks 
        return new Promise((resolve, reject) =>{
            bcrypt.compare(password, user.password, (err, res) => {
            if(res) {
                resolve(user);
            } else {
                reject();// return 400 .
            }
        });    
        });
    });
};


// Mongoose middleware usage for performing some actions before a save.
userSchema.pre('save', function(next) {
    var user = this;

    // check if pwd modified, then sal and hash!! 
    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(user.password, salt, (err, hash) => {
                // convert from plain password to salted, hash password.
                user.password = hash;
                next();
            });
        });
    } else{
        next();
    }
});



// create mongoose model for a user schema.
var User = mongoose.model('User',userSchema);
/* {
    email : {
        type: String,
        required: true,
        minlength: 10,
        trim: true,
        unique: true,
        validate: {
            // alternate way
            //validator: (value) => {
            //    return validator.isEmail(value);
            //},
            // or 
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    }, 
    tokens: [{
        access: {
            type: String,
            required:true
        },
        token: {
            type: String,
            required: true
        }
    }]
});*/

// export model.

module.exports = {User};