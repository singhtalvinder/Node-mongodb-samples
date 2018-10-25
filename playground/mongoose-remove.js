const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// remove documents(records) from db.
//Todo.remove({}).then((result) => {
//    console.log(result);
//});


// find one and remove.
Todo.findOneAndRemove('5bd251ff57f785545f8eaa8a').then((todo) =>{
    console.log(todo);//

})
