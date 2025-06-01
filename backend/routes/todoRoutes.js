const express = require('express');
const router = express.Router();
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

router.get('/', getTodos);           // GET /api/todos?userId=xxx
router.post('/', addTodo);           // POST /api/todos
router.put('/:id', updateTodo);      // PUT /api/todos/:id
router.delete('/:id', deleteTodo);   // DELETE /api/todos/:id

module.exports = router;
