import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import ManagerHome from './components/ManagerHome'; 
import './App.css';
import ComplaintPageTravelers from './components/ComplaintPageTravelers';

function App() {
  const navigateToLogin = () => {
    window.location.href = '/';
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/complainsPage' element={<ComplaintPageTravelers/>}/>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp onSignupSuccess={navigateToLogin} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/manager" element={<ManagerHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
