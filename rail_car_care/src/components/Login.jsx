import React, { useState } from 'react';
import { Container, Button, Form, Card, Image } from 'react-bootstrap';
import Logo from '../images/Logo.PNG';
import ManagerLogo from '../images/Manager.png';
import EmployeeLogo from '../images/Employee.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { alignPropType } from 'react-bootstrap/esm/types';

function LoginPage() {
    const [isFlipped, setFlipped] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleUserTypeSelect = (userType) => {
        setSelectedUserType(userType);
        setFlipped(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLogin = () => {
        console.log("User tried to login");
        console.log(selectedUserType);
        window.location.href='/manager';
    };

    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Card className={`login-card ${isFlipped ? 'flipped' : ''}`}>
              <Card.Body className={isFlipped ? 'card-back' : 'card-front'}>
                  <Image src={Logo} alt="Logo" className="d-block mx-auto mb-3" style={{ maxWidth: '100px' }} />
                  {!isFlipped ? (
                      <div className="d-flex flex-column align-items-center">
                        <div className='row'>
                          <Button variant="primary" className="mb-2" onClick={() => handleUserTypeSelect('Manager')}>
                              <Image src={ManagerLogo} alt="Manager" className="mr-2" style={{ width: '24px' }} />
                              Manager
                          </Button>
                          <Button variant="primary" onClick={() => handleUserTypeSelect('Employee')}>
                              <Image src={EmployeeLogo} alt="Employee" className="mr-2" style={{ width: '24px' }} />
                              Employee
                          </Button>
                          </div>
                      </div>
                  ) : (
                    <Form>
                    <div className='form-group'>
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
                    <div className='form-group'>
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
                    <div className='but-login'>
                    <Button variant="primary" onClick={handleLogin} >
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