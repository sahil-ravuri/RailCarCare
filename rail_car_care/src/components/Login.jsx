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
    };

    const handleLogin = async () => {
        console.log(loginData);
        loginData.role = selectedUserType;
        console.log(loginData);
      
        try {
          const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
          });

          if (!response.ok) {
            // Handle non-successful status codes (e.g., display an error message)
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return;
          }
      
          const responseData = await response.json();
      
          if (responseData.message === 'Logged successfully') {
            console.log('Successfully logged in');
            localStorage.setItem('token', responseData.token);
            window.location.href = '/manager';
          } else {
            console.log('Login failed. Server response:', responseData);
            // Handle unsuccessful login (e.g., display an error message)
          }
        } catch (error) {
          // Handle network errors or other exceptions
          console.error('Error during login:', error);
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
                            </div>
                            <div className='form-inputs'><a href='/reset-password'>Forget Password?</a></div>
                            <div className="login-btn">
                                <Button variant="primary" onClick={handleLogin} style={{ margin: '20px' }}>
                                    Log In
                                </Button>
                            </div>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginPage;
