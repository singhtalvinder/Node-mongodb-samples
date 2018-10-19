const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var id = 'i5bc920441245741e70d0';//'5bc920441245741e70d02f64';


var id = '5bc7cfd1f8506417f86d5627aa11';
// Handy method to check validity of id.
if(!ObjectId.isValid(id)) {
    return console.log('Invalid id provided!! ');
}
User.findById(id).then((user)=> {
        if(!user){
            return console.log('user Id not found');
        }
        console.log('User by ID, document', JSON.stringify(user, undefined, 2));
    },(e) =>{
     console.log(e)
    });




//Todo.find( {
//    _id: id  // mongoose will convert from string to id.
//}).then((todos)=> {
//    console.log('Got the Todos document(s): ', todos);
//});

// find first matching one.
//Todo.findOne({
//    completed: false // mongoose will convert from string to id.
//}).then((todo)=> { // we get single document
//    console.log('Todos document', todo);
//});

//Todo.findById(id).then((todo)=> {
//    if(!todo){
//        return console.log('Id not found');
//    }
//    console.log('Todos by ID, document', todo);
//}).catch((e) => console.log(e));


