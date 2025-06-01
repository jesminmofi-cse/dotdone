const Todo = require('../models/todoModel');

// Get all todos for a user
const getTodos = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: 'User ID required' });

  const todos = await Todo.find({ userId });
  res.status(200).json(todos);
};

// Add new todo
const addTodo = async (req, res) => {
  const { userId, task } = req.body;

  if (!userId || !task)
    return res.status(400).json({ message: 'User ID and task required' });

  const todo = await Todo.create({ userId, task });
  res.status(201).json(todo);
};

// Update a todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { task, completed },
    { new: true }
  );

  if (!updatedTodo)
    return res.status(404).json({ message: 'Todo not found' });

  res.status(200).json(updatedTodo);
};

// Delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const deleted = await Todo.findByIdAndDelete(id);

  if (!deleted)
    return res.status(404).json({ message: 'Todo not found' });

  res.status(200).json({ message: 'Todo deleted successfully' });
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
