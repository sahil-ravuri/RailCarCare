import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Navbar, Nav } from 'react-bootstrap';
import './ComplaintPageTravelers.css';
import { Link } from 'react-router-dom';
import Logo from '../images/Logo.PNG';
import './NavigationBar.css';

function ComplaintPageTravelers() {
  const initialFormData = {
    trainNo: '',
    coachType: '',
    issueType: '',
    issueLocation: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmit, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showSubmitAnotherButton, setShowSubmitAnotherButton] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the specific field error when the user types
    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  const validateForm = () => {
    const newFormErrors = {};

    // Check if required fields are empty
    if (!formData.trainNo) {
      newFormErrors.trainNo = 'Enter the Train Number';
    }
    if (!formData.coachType) {
      newFormErrors.coachType = 'Select Coach Type is required';
    }

    if (!formData.issueType) {
      newFormErrors.issueType = 'Select Issue Type is required';
    }

    if (!formData.issueLocation) {
      newFormErrors.issueLocation = 'Select Issue Location is required';
    }

    // Update state with the new error messages
    setFormErrors(newFormErrors);

    // Return true if there are no errors
    return Object.values(newFormErrors).every((error) => !error);
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const response = await fetch('http://localhost:3001/submit-complaint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Complaint raised successfully.');
      setSubmitted(true);
      setShowSubmitAnotherButton(true);
      setFormData(initialFormData);
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    setShowSubmitAnotherButton(false);
  };

  return (
    <section>
      <Navbar bg="dark" expand="lg" fixed="top">
        <Navbar.Brand className="brand" style={{ color: 'white' }}>
          <img src={Logo} alt="RailCarCareLogo" className="image-logo" />
          RailCarCare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="custom-nav">
            <p style={{ color: 'white', margin: '10px' }}>Are you a manager or an employee?</p>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="complaint-container" style={{backgroundColor:"black"}}>
         {!isSubmit ? (
          <Form className="complaint-form">
            <h2 className="mb-4">Raise a Complaint</h2>
            <Form.Group>
              <Form.Control
                name="trainNo"
                type='text'
                value={formData.trainNo}
                onChange={handleChange}
                isInvalid={!!formErrors.trainNo}
                placeholder='Train No'
              ></Form.Control>
            </Form.Group><br />
            {formErrors.trainNo && <p style={{ color: 'red' }}>{formErrors.trainNo}</p>}
            <Form.Group>
              <Form.Control
                as="select"
                name="coachType"
                value={formData.coachType}
                onChange={handleChange}
                isInvalid={!!formErrors.coachType}
              >
                <option value="">Select Coach Type</option>
                <option value="First Class">First Class</option>
                <option value="Economy Class">Economy Class</option>
                <option value="Sleeper Class">Sleeper Class</option>
              </Form.Control>
            </Form.Group>
            {formErrors.coachType && <p style={{ color: 'red' }}>{formErrors.coachType}</p>}
            <Form.Group>
              <Form.Control
                as="select"
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
                isInvalid={!!formErrors.issueType}
              >
                <option value="">Select Issue Type</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Comfort">Comfort</option>
                <option value="Service">Service</option>
              </Form.Control>
            </Form.Group>
            {formErrors.issueType && <p style={{ color: 'red' }}>{formErrors.issueType}</p>}
            <Form.Group>
              <Form.Control
                as="select"
                name="issueLocation"
                value={formData.issueLocation}
                onChange={handleChange}
                isInvalid={!!formErrors.issueLocation}
              >
                <option value="">Select Issue Location</option>
                <option value="Seat">Seat</option>
                <option value="Restroom">Restroom</option>
                <option value="Aisle">Aisle</option>
              </Form.Control>
            </Form.Group>
            {formErrors.issueLocation && <p style={{ color: 'red' }}>{formErrors.issueLocation}</p>}
            <Form.Group>
              <Form.Control
                as="textarea"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder='Complaint Description (Optional)'
              />
            </Form.Group>
            <Button variant="primary" onClick={handleComplaintSubmit}>
              Submit
            </Button>
          </Form>
         ) : (
            <div>
              <h2 style={{ color: "white" }}>Complaint submitted successfully!</h2>
              {showSubmitAnotherButton && (
                <Button variant="success" onClick={handleSubmitAnother}>
                  Submit Another Complaint
                </Button>
              )}
            </div>

         )}
      </Container>
    </section>
  );
}

export default ComplaintPageTravelers;
