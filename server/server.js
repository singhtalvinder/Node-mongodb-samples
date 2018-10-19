var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

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

//fetch a variable passed via url.
// GET /todos/1234455654576 -- last value is the id passed.
// Id below gets created as a variable on the request object 
// & is the variable name created get the value for id, 
// it can be any thing we need : ex: userId etc ...
// The variable name is specified after url and preceeded 
// with a colon.
app.get('/todos/:id', (req,res) => {
    var id = req.params.id;
    // Check if valid.
    if(!ObjectID.isValid(id))
    {
        //console.log('Invalid object id.');
        // if invalid id, then set status to 404 and 
        // send response with empty body.
        return res.status(404).send();
    }

    // create the query 
    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        // found a matching id .
        //res.send({todo: todo});
        res.send({todo}); // respond with object instead of array.

    }).catch((e) => {
        res.status(400).send();
    })
})


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

