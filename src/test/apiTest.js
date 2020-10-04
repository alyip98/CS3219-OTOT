process.env.NODE_ENV = 'TEST';
const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server');
const todoController = require('../api/todoController')
chai.use(chaiHttp)
const expect = chai.expect
const app = require('../index')

const mongoServer = new MongoMemoryServer({binary: {version: '4.4.1'}});
mongoose.Promise = Promise;
mongoServer.getUri().then((mongoUri) => {
    console.log(mongoUri)
    const mongooseOpts = {
        // options for mongoose 4.11.3 and above
        // autoReconnect: true,
        // reconnectTries: Number.MAX_VALUE,
        // reconnectInterval: 1000,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    mongoose.connect(mongoUri, mongooseOpts);
    mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
            console.log(e);
            mongoose.connect(mongoUri, mongooseOpts);
        }
        console.log(e);
    });
    mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`);
        run()
    })
}).catch(console.error)

describe('api/todo/:todo_id', () => {
    let todoId = ""
    it('(POST) create new todo', (done) => {
        chai.request(app)
            .post('/api/todo')
            .send({
                "title": "Sample todo",
                "desc": "Short description"
            })
            .end((req, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.include({
                    "message": 'New todo created!',
                })
                expect(res.body.data).to.include({
                    title: 'Sample todo',
                    desc: 'Short description'
                })
                todoId = res.body.data._id
                done()
            })
    })

    it('(GET) list all todo', (done) => {
        chai.request(app)
            .get('/api/todo')
            .end((req, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.include({
                    "message": 'Todo list retrieved successfully',
                })
                expect(res.body.data).to.have.lengthOf(1)
                expect(res.body.data[0]).to.include({
                    title: 'Sample todo',
                    desc: 'Short description'
                })
                done()
            })
    })

    it('(GET) get todo by todo_id', (done) => {
        chai.request(app)
            .get('/api/todo')
            .query({"todo_id": todoId})
            .end((req, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.include({
                    "message": 'Todo list retrieved successfully',
                })
                expect(res.body.data).to.have.lengthOf(1)
                expect(res.body.data[0]).to.include({
                    title: 'Sample todo',
                    desc: 'Short description'
                })
                done()
            })
    })

    it('(PUT) edit todo', (done) => {
        chai.request(app)
            .put(`/api/todo/${todoId}`)
            .send({
                "title": "Updated title",
                "desc": "Updated description"
            })
            .end((req, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.include({
                    "message": 'todo Info updated',
                })
                expect(res.body.data).to.include({
                    title: 'Updated title',
                    desc: 'Updated description'
                })
                done()
            })
    })

    it('(DELETE) delete todo by todo_id', (done) => {
        chai.request(app)
            .delete(`/api/todo/${todoId}`)
            .end((req, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.include({
                    "message": 'todo deleted',
                })
                done()
            })
    })
});
