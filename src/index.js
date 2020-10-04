const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const todoRouter = require('./api/todoRoutes')

const url = process.env.db_url || "mongodb://localhost:27017/mydb";
const app = express()
const port = 8000

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.use('/api/', todoRouter)

if (process.env.NODE_ENV !== "TEST") {
    mongoose.connect(url, {useNewUrlParser: true});
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    })
}

module.exports = app



