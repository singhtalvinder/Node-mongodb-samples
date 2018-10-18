var mongoose = require('mongoose');
// use global promise instead of other lib.
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

// ES6 syntax.
module.exports = {mongoose};

// old way
//module.exports = {
//    mongoose: mongoose
//};