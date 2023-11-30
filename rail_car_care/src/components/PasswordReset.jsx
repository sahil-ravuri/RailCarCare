import React, { useState } from 'react';
import { Container, Button, Form, Card, Image } from 'react-bootstrap';
import Logo from '../images/Logo.PNG';
import './Login.css';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [isFlipped, setFlipped] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
  });

  const handleEmail = (e) =>{
    const emailSent = e.target.value
    setEmail(emailSent)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send request to backend to generate and send OTP
    setFlipped(true)
    try {
      const response = await fetch('http://localhost:3001/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'email': email }),
      });

      if (!response.ok) {
        // Handle non-successful status codes (e.g., display an error message)
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = async (e) => {
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
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card className={`login-card ${isFlipped ? 'flipped' : ''}`}>
        <Card.Body className={isFlipped ? 'card-back' : 'card-front'}>
          <Image src={Logo} alt="Logo" className="d-block mx-auto mb-3" style={{ maxWidth: '100px', paddingTop: '5%' }} />
          {!isFlipped ? (
            <Form>
              <div className='form-inputs'>
                <Form.Group>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </div>
              <div className="login-btn">
                <Button variant="primary" onClick={handleSubmit} style={{ margin: '20px' }}>
                  Send OTP
                </Button>
              </div>
            </Form>
          ) : (
            <Form>
              <div className='form-inputs'>
                <Form.Group>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </div>
              <div className='form-inputs'>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                  />
                </Form.Group>
              </div>
              <div className='form-inputs'>
                <Form.Group>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                </Form.Group>
              </div>
              <div className="login-btn">
                <Button variant="primary" onClick={handleReset} style={{ margin: '20px' }}>
                  Reset Password
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PasswordResetRequest;

