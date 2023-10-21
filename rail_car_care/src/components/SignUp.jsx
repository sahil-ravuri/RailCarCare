import React, { useState } from 'react';

function SignUpPage({onSignupSuccess}) {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = () => {
    // Implement sign-up logic
    localStorage.setItem('signupData', JSON.stringify(formData));
    onSignupSuccess();
  };

  return (
    <main>
      <section>
        <h2>Sign-up</h2>
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="button" onClick={handleSignUp}>Sign Up</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default SignUpPage;
