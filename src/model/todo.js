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
    },
    is_done: {
        type: Boolean,
        default: false
    }
});

const Todo = module.exports = mongoose.model('todo', todoSchema);
module.exports.get = function (callback, limit) {
    Todo.find(callback).limit(limit);
}
