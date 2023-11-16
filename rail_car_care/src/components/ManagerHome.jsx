import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import NavBar from './NavBar';
import AboutUs from './AboutUs';
import './ManagerHome.css';

function ManagerHome() {
  const [complaints, setComplaints] = useState([]);
  
  const handleLogout = () => {
    window.location.href = '/login';
  };

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-complaints');
      if (response.ok) {
        const data = await response.json();
        setComplaints(data);
      } else {
        console.error('Failed to fetch complaints');
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/delete-complaint/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Complaint deleted successfully.');
        fetchComplaints(); // Refresh the complaints after deletion
      } else {
        console.error('Failed to delete complaint');
      }
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  return (
    <div>
      <NavBar onLogout={handleLogout} />
      <div className="top-content" style={{backgroundColor: "white", padding: "20px"}}>
        <h2>Dashboard</h2>
        <h2>Complaints Information</h2>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Train No</th>
              <th>CoachType</th>
              <th>Issue Type</th>
              <th>Issue Location</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={complaint._id}>
                <td>{index + 1}</td>
                <td>{complaint.trainNo}</td>
                <td>{complaint.coachType}</td>
                <td>{complaint.issueType}</td>
                <td>{complaint.issueLocation}</td>
                <td>{complaint.description}</td>
                <td>
                  <Button variant='danger' onClick={() => handleDelete(complaint._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AboutUs />
    </div>
  );
}

export default ManagerHome;
