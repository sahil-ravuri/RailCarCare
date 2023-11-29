import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ManagerHome from './components/ManagerHome'; 
import './App.css';
import ComplaintPageTravelers from './components/ComplaintPageTravelers';
import PasswordResetRequest from './components/PasswordReset';

function App() {
  const navigateToLogin = () => {
    window.location.href = '/';
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ComplaintPageTravelers/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp onSignupSuccess={navigateToLogin} />} />
          <Route path="/manager" element={<ManagerHome />} />
          <Route path="/reset-password" element={<PasswordResetRequest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
