const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')

const url = "mongodb://db:27017/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");

    db
    db.close();
});