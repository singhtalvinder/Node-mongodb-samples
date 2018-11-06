const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();

const userTwoId = new ObjectID();

// add user seed data.
const users = [{
    _id: userOneId,
    email: 'sample1@example.com',
    password: 'User1Password',
    tokens: [{
        access: 'auth',
        token:  jwt.sign({_id: userOneId, access: 'auth'}, 'mysecret123').toString()
        }]  
    },
    {
    _id: userTwoId,
    email: 'test2@example.com',
    password: 'User2Password'
    }];

// add todos seed data
const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
},{
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 621
}];

// testing lifecycle method .
// runs before every test case.
// will replace this with a new method since we need to test
// get requests.
//beforeEach((done) => {
//    Todo.remove({}).then(() => done());
//});
const populateTodos = (done) => {
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(() => done());
};
// mongoose method insertmany

const populateUsers = (done) => {
    User.remove({}).then(()=> {
        var user1 = new User(users[0]).save();
        var user2 = new User(users[1]).save();

        return Promise.all([user1, user2])
    }).then(()=> done());
};

// export todos array.
module.exports = {todos, populateTodos, users, populateUsers};