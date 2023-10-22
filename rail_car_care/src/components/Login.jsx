import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Card, Image } from 'react-bootstrap';
import Logo from '../images/Logo.PNG';
import ManagerLogo from '../images/Manager.png';
import EmployeeLogo from '../images/Employee.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { Link } from 'react-router-dom';

function LoginPage() {
    const [isFlipped, setFlipped] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        // Check if there is locally stored login data and update the state
        const storedLoginData = localStorage.getItem('loginData');
        if (storedLoginData) {
            setLoginData(JSON.parse(storedLoginData));
        }
    }, []);

    const handleUserTypeSelect = (userType) => {
        setSelectedUserType(userType);
        setFlipped(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLogin = () => {

        console.log(selectedUserType);
        // Here, you can check the login credentials
        // For simplicity, let's assume correct credentials are:
        const correctCredentials = {
            email: 'john@gmail.com',
            password: 'John@123',
        };

        if (
            loginData.email === correctCredentials.email &&
            loginData.password === correctCredentials.password
        ) {
            // Store the login data locally
            localStorage.setItem('loginData', JSON.stringify(loginData));
            // Redirect to the appropriate page
            window.location.href = '/manager';
        } else {
            alert('Incorrect email or password');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card className={`login-card ${isFlipped ? 'flipped' : ''}`}>
                <Card.Body className={isFlipped ? 'card-back' : 'card-front'}>
                    <Image src={Logo} alt="Logo" className="d-block mx-auto mb-3" style={{ maxWidth: '100px', paddingTop: '5%' }} />
                    {!isFlipped ? (
                        <div className="d-flex flex-column align-items-center">
                            <Button className="logo-btn" variant="primary" onClick={() => handleUserTypeSelect('Manager')}>
                                <Image src={ManagerLogo} alt="Manager" className="mr-2" style={{ width: '24px' }} />
                                Manager
                            </Button><br />
                            <Button className="logo-btn" variant="primary" onClick={() => handleUserTypeSelect('Employee')}>
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
                            <div className='form-inputs'><a href='#'>Forget Email/Password?</a></div>
                            <div className="login-btn">
                                <Button variant="primary" onClick={handleLogin} style={{ margin: '20px' }}>
                                    Log In
                                </Button>
                                <Link to='/signup' className="btn btn-primary">Sign Up</Link>
                            </div>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginPage;
