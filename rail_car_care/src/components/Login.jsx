import React, { useState, useContext } from 'react';
import { Container, Button, Form, Card, Image } from 'react-bootstrap';
import Logo from '../images/Logo.PNG';
import ManagerLogo from '../images/Manager.png';
import EmployeeLogo from '../images/Employee.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

function LoginPage() {
    const [isFlipped, setFlipped] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [errors, setErrors] = useState({});
    const [mesg, setMesg] = useState('');
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        role: '',
    });

    const handleUserTypeSelect = (userType) => {
        setSelectedUserType(userType);
        setFlipped(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });

        setErrors({
          ...errors,
          [name]: '',
        });
    };

    const validateForm = () => {
        const newErrors = {};
    
        // Email validation
        if (!loginData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
          newErrors.email = 'Invalid email address';
        }
        if (!loginData.password.trim()) {
            newErrors.password = 'Password is required';
          } else if (loginData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
          }
          setErrors(newErrors);
          return Object.values(newErrors).every((error) => !error);
    };

    const handleLogin = async () => {
      loginData.role = selectedUserType;
  
      if (!validateForm()) {
          return;
      }
  
          const response = await fetch('http://localhost:3001/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginData),
          });
  
          if (!response.ok) {
              const responseData = await response.json();
              setMesg(responseData.message);
              return;
          }
  
          const responseData = await response.json();
  
          if (responseData.message === 'Logged successfully') {
              localStorage.setItem('token', responseData.token);
              window.location.href = '/manager';
          } else {
              console.log('Login failed. Server response:', responseData);
              setMesg(responseData.message);
          }
      
  };
  
      

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card className={`login-card ${isFlipped ? 'flipped' : ''}`}>
                <Card.Body className={isFlipped ? 'card-back' : 'card-front'}>
                    <Image src={Logo} alt="Logo" className="d-block mx-auto mb-3" style={{ maxWidth: '100px', paddingTop: '5%' }} />
                    {!isFlipped ? (
                        <div className="d-flex flex-column align-items-center">
                            <Button className="logo-btn" variant="primary" onClick={() => handleUserTypeSelect('manager')}>
                                <Image src={ManagerLogo} alt="Manager" className="mr-2" style={{ width: '24px' }} />
                                Manager
                            </Button><br />
                            <Button className="logo-btn" variant="primary" onClick={() => handleUserTypeSelect('employee')}>
                                <Image src={EmployeeLogo} alt="Employee" className="mr-2" style={{ width: '24px' }} />
                                Employee
                            </Button>
                        </div>
                    ) : (
                        <>{mesg && <p style={{ color: 'red', textJustify:'center' }}>{mesg}</p>}
                        <Form>
                            <div className='form-inputs'>
                                <Form.Group>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={loginData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                    />
                                </Form.Group>
                                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                            </div>
                            <div className='form-inputs'>
                                <Form.Group>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                            </div>
                            <div className='form-inputs'><a href='/reset-password'>Forget Password?</a></div>
                            <div className="login-btn">
                                <Button variant="primary" onClick={handleLogin} style={{ margin: '20px' }}>
                                    Log In
                                </Button>
                            </div>
                        </Form></>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginPage;
