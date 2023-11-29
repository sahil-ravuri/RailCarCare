import React, { useState } from 'react';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send request to backend to generate and send OTP
    try {
        const response = await fetch('http://localhost:3001/request-password-reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'email': email}),
        });

        if (!response.ok) {
          // Handle non-successful status codes (e.g., display an error message)
          console.error(`Error: ${response.status} - ${response.statusText}`);
          return;
        }
      
        window.location.href = '/otp-verification';


    }catch(error){
            console.error(error); 
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit">Request Password Reset</button>
    </form>
  );
};

export default PasswordResetRequest;

