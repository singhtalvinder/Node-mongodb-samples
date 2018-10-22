const expect =require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

// local files 
const {app} = require('./../server'); // .js ext not needed in es6
const {Todo} = require('./../models/todo');

// add seed data
const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
},{
    _id: new ObjectID(),
    text: "Second test todo"
}];

// testing lifecycle method .
// runs before every test case.
// will replace this with a new method since we need to test
// get requests.
//beforeEach((done) => {
//    Todo.remove({}).then(() => done());
//});
beforeEach((done) => {
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(() => done());
});
// mongoose method insertmany


// test case 
describe('POST /todos', () => {
    it('Should create a new todo document', (done) => {
        var text = "Test todo text";

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=> {
          expect(res.body.text).toBe(text);  
        })
        .end((err, res)=> {
            if(err){
                return done(err);
            }
            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);// since we added 2
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
          
        });
    });

    it('Should not create todo document, with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res) => {
            if(err) {
                return done(err);
            }
            // no errors.
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) =>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
});

// next test case.
describe('GET /todos:/id', () =>{
    it('Should return todo document.',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('Should return 404 if todo document not found.',(done)=>{
        var hexId = new ObjectID().toHexString();

        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done); // async test 

    });

    it('Should return 404 for non-object ids.',(done)=>{
        request(app)
        .get('/todos/12332}')
        .expect(404)
        .end(done); //async test 

    });
})