import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';
import './TodoPage.css'; // 🧁 CSS file

const TodoPage = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const fetchTodos = useCallback(async () => {
    try {
      const res = await axios.get(`https://dotdone.onrender.com/api/todos?userId=${user._id}`);
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, [user._id]);

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      await axios.post('https://dotdone.onrender.com/api/todos', { task, userId: user._id });
      setTask('');
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="todo-page">
      <h2 className="todo-heading">Your DotDone Todos 🌈</h2>
      <div className="todo-input-group">
        <input
          placeholder="What's on your mind?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="todo-input"
        />
        <button onClick={addTodo} className="todo-add-button">Add</button>
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
