const expect =require('expect');
const request = require('supertest');

// local files 
const {app} = require('./../server'); // .js ext not needed in es6
const {Todo} = require('./../models/todo');

// testing lifecycle method .
// runs before every test case.
beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

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
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(1);// since we are wiping the database before running test.
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
                expect(todos.length).toBe(0);
                done();
            }).catch((e) => done(e));
        });
    });
});