const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const todoRouter = require('./api/todoRoutes')

const url = "mongodb://localhost:27017/mydb";
const app = express()
const port = 8000

mongoose.connect(url, {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json())

    app.use('/api/', todoRouter)

// app.get('/api/', (req, res) => {
//     // console.log("Received req", req)
//     res.send('Hello World!')
// })

    // app.get('/api/echo', (req, res) => {
    //     console.log("GET echo", req.query)
    //     // res.send(req.query)
    //     res.json({
    //         "msg": "GET echo",
    //         "data": req.query
    //     })
    // })
    //
    // app.post('/api/echo', (req, res) => {
    //     console.log("POST echo", req.query)
    //     res.json({
    //         "msg": "POST echo",
    //         "data": req.body
    //     })
    // })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
})