const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

const Todo = module.exports = mongoose.model('todo', todoSchema);
module.exports.get = function (callback, limit) {
    Todo.find(callback).limit(limit);
}
