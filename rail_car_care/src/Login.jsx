import React, { useState } from 'react';

function LoginPage() {
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
    <div>
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
    </div>
  );
}

export default LoginPage;
