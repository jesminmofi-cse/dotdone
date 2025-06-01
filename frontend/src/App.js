import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPages';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';

function AppWrapper() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<RegisterPage navigate={navigate} />} />
      <Route path="/login" element={<LoginPage setUser={setUser} navigate={navigate} />} />
      <Route path='/register' element={<RegisterPage setUser={setUser} navigate={navigate}/>}/>
      <Route path="/todos" element={user ? <TodoPage user={user} /> : <LoginPage setUser={setUser} navigate={navigate} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
