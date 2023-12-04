import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Card, Image } from 'react-bootstrap';
import Logo from '../images/Logo.PNG';
import './Login.css';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [isFlipped, setFlipped] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
  });
  const [otpTimer, setOtpTimer] = useState(60); // 1 minutes in seconds
  const [otpExpired, setOtpExpired] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let timer;

    if (isFlipped && !otpExpired) {
      timer = setInterval(() => {
        setOtpTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(timer);
            setOtpExpired(true);
            setFlipped(false)
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isFlipped, otpExpired]);

  const handleEmail = (e) => {
    const emailSent = e.target.value;
    setEmail(emailSent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setFlipped(true);
    setOtpExpired(false);
    setOtpTimer(60);

    try {
      const response = await fetch('http://localhost:3001/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
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

    const newErrors = {};

    // New password validation
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const response = await fetch('http://localhost:3001/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        otp: formData.otp,
        password: formData.newPassword,
      }),
    });

    if (!response.ok) {
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
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              </div>
              <div className="login-btn">
                <Button variant="primary" onClick={handleSubmit} style={{ margin: '20px' }}>
                  Send OTP
                </Button>
              </div>
              {otpExpired && <div style={{ color: 'red' }}>OTP expired. Please request a new OTP.</div>}
            </Form>
          ) : (
            <Form>
              <div className='form-inputs'>
                <Form.Group>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    readOnly
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
                {!otpExpired && <div>
                    OTP expires In: {Math.floor(otpTimer / 60)}:{otpTimer % 60}
                  </div>}
              </div>
              <div className='form-inputs'>
                <Form.Group>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                  {errors.newPassword && <p style={{ color: 'red' }}>{errors.newPassword}</p>}
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