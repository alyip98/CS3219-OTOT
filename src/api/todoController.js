// todoController.js
// Import todo model
Todo = require('../model/todo');
// Handle index actions
exports.index = function (req, res) {
    Todo.get(function (err, todos) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Todo list retrieved successfully",
            data: todos
        });
    });
};
// Handle create todo actions
exports.new = function (req, res) {
    const todo = new Todo();
    todo.title = req.body.title;
    todo.desc = req.body.desc;

    // save the todo and check for errors
    todo.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New todo created!',
                data: todo
            });
    });
};
// Handle view todo info
exports.view = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
        if (err)
            res.send(err);
        res.json({
            message: 'todo details loading..',
            data: todo
        });
    });
};
// Handle update todo info
exports.update = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
        if (err) {
            res.statusCode = 400
            return res.json({
                message: "Bad request possibly due to malformed todo_id"
            });
        }

        if (!todo) {
            res.statusCode = 404
            return res.json({
                message: 'todo not found',
                data: null
            })
        }
        todo.title = req.body.title || "";
        todo.desc = req.body.desc || "";
// save the todo and check for errors
        todo.save(function (err) {
            if (err)
                return res.json(err);
            return res.json({
                message: 'todo Info updated',
                data: todo
            });
        });
    });
};
// Handle delete todo
exports.delete = function (req, res) {
    Todo.deleteOne({
        _id: req.params.todo_id
    }, function (err, result) {
        if (err)
            res.send(err);
        if (result.deletedCount === 0)
            res.statusCode = 404
        res.json({
            status: "success",
            message: 'todo deleted'
        });
    });
};

// Handle delete todo
exports.clear = function (req, res) {
    Todo.deleteMany({

    }, function (err, result) {
        if (err)
            res.send(err);
        if (result.deletedCount === 0)
            res.statusCode = 404
        res.json({
            status: "success",
            message: 'all todos deleted'
        });
    });
};