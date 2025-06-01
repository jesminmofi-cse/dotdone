import React from 'react';
import axios from 'axios';
import './TodoItem.css';

const TodoItem = ({ todo, fetchTodos }) => {
  const toggleComplete = async () => {
    try {
      await axios.put(`https://dotdone.onrender.com/api/todos/${todo._id}`, {
        completed: !todo.completed,
        task: todo.task,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`https://dotdone.onrender.com/api/todos/${todo._id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="todo-item">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
        />
        <span className={todo.completed ? 'completed' : ''}>{todo.task}</span>
      </label>
      <button className="delete-button" onClick={deleteTodo}>❌</button>
    </div>
  );
};

export default TodoItem;
