var mongoose = require('mongoose');
// use global promise instead of other lib.
mongoose.Promise = global.Promise;

// Connect to remote db or local db based on env variable..
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }); 
// ||'mongodb://localhost:27017/TodoApp');

console.log("Connected to local host momgodb !! ");

// ES6 syntax.
module.exports = {mongoose};

// old way
//module.exports = {
//    mongoose: mongoose
//};