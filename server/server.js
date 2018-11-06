const config = require('./config/config')
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// ES6 destructuring.
var {mongoose} = require('./db/mongoose');// ext  .js can be left over');

var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

// create routes.
// server
var app = express();

// use port from system for heruku, else 
// set port to 3000 for local host.
const port = process.env.PORT || 3000;

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
    });
});

app.delete('/todos/:id', (req,res) => {
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
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        // found a matching id .
        //res.send({todo: todo});
        res.send({todo}); // respond with object instead of array.

    }).catch((e) => {
        res.status(400).send();
    });
});

// Edit/update existing recs/docs.
app.patch('/todos/:id', (req, res) => {
    var id =  req.params.id;
    // pick is a helper in lodash, which allows to pick selective
    // properties in the body.
    var body = _.pick(req.body, ['text', 'completed']);

    // Check if valid.
    if(!ObjectID.isValid(id))
    {
        // if invalid id, then set status to 404 and 
        // send response with empty body.
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        bodyParser.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo) =>{
        // check if found.
        if(!todo) {
            return res.send(404).send();
        }
        res.send({todo});

    }).catch((e) => {
        res.status(404).send();
    })
});

// POST /users using authentication.
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() =>{
        return user.generateAuthToken();
    }).then((token)=> {
        // custom header by x-
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    }) 
});

// Private route , also utilized middleware call for authenticating user!! 
app.get('/users/me', authenticate, (req,res) => {
    res.send(req.user);
});



app.listen(port, () => {
    console.log(`Started on port: ${port}`);
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

