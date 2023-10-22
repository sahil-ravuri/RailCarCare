import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import ManagerHome from './components/ManagerHome'; // Import the ManagerHome component
import './App.css';

function App() {
  const navigateToLogin = () => {
    window.location.href = '/';
  };

  return (
    <div className='app-container'>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/manager' element={<ManagerHome />} />
        <Route path="/signup" element={<SignUp onSignupSuccess={navigateToLogin}/>} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
