var mongoose = require('mongoose');
// use global promise instead of other lib.
mongoose.Promise = global.Promise;

// Connect to remote db or local db based on env variable..
//process.env.MONGODB_URI ||
//mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }); 
// to resolve error associated with "Before each .. hook in server tests"
mongoose.connect('mongodb://127.0.0.1:27017/TodoApp', { useNewUrlParser: true }); 
// ||'mongodb://localhost:27017/TodoApp');

console.log("Connected to local host momgodb !! ");

// ES6 syntax.
module.exports = {mongoose};

// old way
//module.exports = {
//    mongoose: mongoose
//};