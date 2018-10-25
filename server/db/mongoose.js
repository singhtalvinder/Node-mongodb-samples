var mongoose = require('mongoose');
// use global promise instead of other lib.
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');
//mongoose.connect(
    //'mongodb://test123:test123@ds139523.mlab.com:39523/todoapp' ||
//    'mongodb://localhost:27017/Todoapp');

// ES6 syntax.
module.exports = {mongoose};

// old way
//module.exports = {
//    mongoose: mongoose
//};