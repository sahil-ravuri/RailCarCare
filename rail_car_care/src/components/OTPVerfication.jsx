import React, { useState } from 'react';

const OTPVerification = () => {
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Send OTP and new password to backend for verification and reset

        const response = await fetch('http://localhost:3001/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            // Handle non-successful status codes (e.g., display an error message)
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return;
         }
         
        window.location.href = '/login';
         
  
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter OTP"
          required
        />
        <input
          type="text"
          value={formData.otp}
          onChange={handleChange}
          placeholder="Enter OTP"
          required
        />
        <input
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    );
  };

  export default OTPVerification;