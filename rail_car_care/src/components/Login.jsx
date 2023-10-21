import React, { useState } from 'react';
import Logo from '../images/Logo.PNG';
import ManagerLogo from '../images/Manager.png';
import EmployeLogo from '../images/Employee.png';
import './Login.css';

function LoginPage() {
  
  const align={
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "cadetblue"
  }

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = () => {
    // Retrieve the signup data from localStorage
    const storedSignupData = JSON.parse(localStorage.getItem('signupData'));

    if (
      storedSignupData &&
      loginData.email === storedSignupData.email &&
      loginData.password === storedSignupData.password
    ) {
      // Successful login, you can redirect to another page or set an authentication state
      window.location.href="/home";
    } else {
      // Failed login
      alert('Login Failed');
    }
  };

  return (
    <div className='container'>
      <div className='front'>
        <div className='Logo'><img className='Logo-Img' src={Logo} alt='Logo' /></div>
        <div className="row">
          <div className="column">
            <div className="card">
              <img id='Mang-img' src={ManagerLogo} alt="Manager-Icon" />
              <p>Manager</p>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <img id="Emp-img" src={EmployeLogo} alt="Employee-Icon" />
              <p>Employee</p>
            </div>
          </div>
       </div>
     </div>
     <div className='back'>
      <div className='Logo'><img className='Logo-Img' src={Logo} alt='Logo' /></div>
      <form className='formElement'>
      <label for="email">Email:</label>
      <input
        type="text"
        name="email"
        value={loginData.email}
        onChange={handleChange}
        placeholder="Email"
      /><br />
      <label for="password">Password:</label>
      <input
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        placeholder="Password"
      /><br />
      <button onClick={handleLogin}>Log In</button>
      </form>
     </div>
    </div>
  );
}

export default LoginPage;
