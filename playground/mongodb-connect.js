//const MongoClient = require('mongodb').MongoClient;

// use destructuring ...
const {MongoClient, ObjectID} = require('mongodb');
// allows to add new object ids.


// will not be using much, let mongodb create object ids
//var obj = new ObjectID();
//console.log(obj);

// object restructuring ...
// pulling out values from the object inserted. 

//var user = {name: 'Mike', age:26};
//var {name} = user;
//////////////////////////////////////////////
// mongodb created on mlab for testing on heroku. 
/*
MongoClient.connect('mongodb://test1:todoapp@123@ds139523.mlab.com:39523/todoapp', (err, client)=>{
if(err) {
    return console.log('Unable to connect to the mlab---Mongodb server');
}
console.log('connected to mlab ------Mongodb server');

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

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err) {
        return console.log('Unable to connect to the Mongodb server');
    }
    console.log('connected to Mongodb server');

    const db = client.db('TodoApp');

    db.collection('Users').insertOne({
        name: 'Bill',
        age: 35,
        location: 'LA'
    }, (err, result) => {
        if(err) {
            return console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
        // if need to print only the _id  then use below command.
        console.log(result.ops[0]._id);
        // to get the timestamp of the object id (_id) when it was created.
        console.log(result.ops[0]._id.getTimestamp());
    });

   
    client.close();
});

 /*
    db.collection('Todos').insertOne({
        text: 'Something to do ',
        completed: false
    }, (err, result) => {
        if(err) {
            return console.log('Unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });*/