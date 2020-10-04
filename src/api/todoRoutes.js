const router = require('express').Router();

var todoController = require('./todoController');

router.route('/todo')
    .get(todoController.index)
    .post(todoController.new)
    .delete (todoController.clear);
router.route('/todo/:todo_id')
    .get(todoController.view)
    .patch(todoController.update)
    .put(todoController.update)
    .delete(todoController.delete);

// Export API routes
module.exports = router;
