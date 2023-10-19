import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';

function App() {

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp onSignupSuccess={navigateToLogin}/>} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
