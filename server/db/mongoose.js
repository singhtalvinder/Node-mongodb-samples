var mongoose = require('mongoose');
// use global promise instead of other lib.
mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect(
    'mongodb://test1:todoapp\@123@ds139523.mlab.com:39523/todoapp' ||
    'mongodb://localhost:27071/Todoapp');

//////////////////////////////////////////////
// mongodb created on mlab for testing on heroku. 
// right now we dont have the process var but 
//anyway we want to connect to the mlab one
//MongoClient.connect(process.env.MONGODB_URI ||
//'mongodb://test1:todoapp@123@ds139523.mlab.com:39523/todoapp', 
/*MongoClient.connect(
    'mongodb://test1:todoapp@123@ds139523.mlab.com:39523/todoapp' ||
   'mongodb://localhost:27071/Todoapp', 
    (err, client)=>{
        if(err) {
            return console.log('Unable to connect to the mlab---Mongodb server');
    }

    console.log('connected to mlab ------Mongodb server');
    });*/
// ES6 syntax.
module.exports = {mongoose};
/*
const db = client.db('todoapp');
db.collection('todos').insertOne({
    text: 'Something to do ',
    completed: false
    }, (err, result) => {
    if(err) {
        return console.log('Unable to insert -todo- into mlab collection', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
    });
});*/








// old way
//module.exports = {
//    mongoose: mongoose
//};