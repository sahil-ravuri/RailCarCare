import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Navbar, Nav } from 'react-bootstrap';
import './ComplaintPageTravelers.css';
import { Link } from 'react-router-dom';
import Logo from "../images/Logo.PNG";
import './NavigationBar.css';

function ComplaintPageTravelers() {
  const [coachType, setCoachType] = useState('');
  const [issueType, setIssueType] = useState('');
  const [issueLocation, setIssueLocation] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCoachTypeChange = (e) => {
    setCoachType(e.target.value);
  };

  const handleIssueTypeChange = (e) => {
    setIssueType(e.target.value);
  };

  const handleIssueLocationChange = (e) => {
    setIssueLocation(e.target.value);
  };

  const handleComplaintTextChange = (e) => {
    setComplaintText(e.target.value);
  };

  const handleComplaintSubmit = () => {
    setSubmitting(true);

    const complaintData = {
      coachType,
      issueType,
      issueLocation,
      complaintText,
    };

    if (localStorage) {
      const existingComplaints = JSON.parse(localStorage.getItem('complaints')) || [];

      existingComplaints.push(complaintData);

      localStorage.setItem('complaints', JSON.stringify(existingComplaints));

      setCoachType('');
      setIssueType('');
      setIssueLocation('');
      setComplaintText('');

      setTimeout(() => {
        setSubmitting(false);
      }, 2000);
    } else {
      console.error('Local storage is not supported in this browser.');
    }
  };

  return (
    <section>
 <Navbar bg="dark"  expand="lg" fixed="top">
        <Navbar.Brand className="brand" style={{color:'white'}}>
          <img src={Logo} alt="RailCarCareLogo" className="image-logo" />
          RailCarCare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="custom-nav">
            <p style={{color:'white', margin:'10px'}}>Are you a manager or an employee?</p>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    <Container className="complaint-container">
      <Form className="complaint-form">
        <h2 className="mb-4">Raise a Complaint</h2>
        <Form.Group>
          <Form.Label>Select Coach Type:</Form.Label>
          <Form.Control as="select" name="coachType" value={coachType} onChange={handleCoachTypeChange}>
            <option value="">Select Coach Type</option>
            <option value="First Class">First Class</option>
            <option value="Economy Class">Economy Class</option>
            <option value="Sleeper Class">Sleeper Class</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Issue Type:</Form.Label>
          <Form.Control as="select" name="issueType" value={issueType} onChange={handleIssueTypeChange}>
            <option value="">Select Issue Type</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Comfort">Comfort</option>
            <option value="Service">Service</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Issue Location:</Form.Label>
          <Form.Control as="select" name="issueLocation" value={issueLocation} onChange={handleIssueLocationChange}>
            <option value="">Select Issue Location</option>
            <option value="Seat">Seat</option>
            <option value="Restroom">Restroom</option>
            <option value="Aisle">Aisle</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Complaint Description:</Form.Label>
          <Form.Control as="textarea" name="complaintText" rows="4" value={complaintText} onChange={handleComplaintTextChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleComplaintSubmit} disabled={submitting}>
          {submitting ? 'Submitting' : 'Submit Complaint'}
        </Button>
        {submitting && <p>Submitting...</p>}
      </Form> 
    </Container>
    </section>
  );
}

export default ComplaintPageTravelers;