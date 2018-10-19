var express = require('express');
var bodyParser = require('body-parser');

// ES6 destructuring.
var {mongoose} = require('./db/mongoose');// ext  .js can be left over');

var {Todo} = require('./models/todo');
var {user} = require('./models/user');

// create routes.
// server
var app = express();
// middleware for body parser.
app.use(bodyParser.json());

// post route.
// fwd slash for creation
app.post('/todos', (req,res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=> {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// get route.
// get all recs.
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
    res.send({todos}); // since we get more than one(is an array), pass as object.
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};
/*
// create a user document(record) to the model.
var user = new User({ 
    email: '  test@test.com  '
});

user.save().then(doc => {
    console.log('user saved:', doc);
    }, (e) => {
        console.log('unable to save user', e);
    });

*/

