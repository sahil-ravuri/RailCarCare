import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Col } from 'react-bootstrap';
import './ComplaintPageTravelers.css';
import { Link } from 'react-router-dom';

function ComplaintPageTravelers() {
  const [coachType, setCoachType] = useState('');
  const [issueType, setIssueType] = useState('');
  const [issueLocation, setIssueLocation] = useState('');
  const [complaintText, setComplaintText] = useState('');

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
    console.log('Complaint Submitted:', {
      coachType,
      issueType,
      issueLocation,
      complaintText,
    });
  };

  return (
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
        <Button variant="primary" onClick={handleComplaintSubmit}>
          Submit Complaint
        </Button>
      </Form>
      <section style={{float:'right'}}>
        <p>Are you a Manager or an Employee?
        <Link to='/Login'>Login</Link>
        </p>
      </section>
    </Container>
  );
}

export default ComplaintPageTravelers;