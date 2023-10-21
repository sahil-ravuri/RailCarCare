import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import './App.css';

function App() {

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp onSignupSuccess={navigateToLogin}/>} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
