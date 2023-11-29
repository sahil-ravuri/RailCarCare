import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ManagerHome from './components/ManagerHome'; 
import './App.css';
import ComplaintPageTravelers from './components/ComplaintPageTravelers';
import PasswordResetRequest from './components/PasswordReset';
import OTPVerification from './components/OTPVerfication';
import ProfilePage from './components/Profile';
import { EmployeeCreationPage } from './components/Profile';
import Orders from './components/Orders';
import './components/Orders.css';

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
          <Route path="/profile" element={<ProfilePage/> }/>
          <Route path="/orders" element={<Orders/> }/>
          <Route path="/reset-password" element={<PasswordResetRequest />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
