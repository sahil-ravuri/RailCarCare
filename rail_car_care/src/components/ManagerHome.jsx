// ManagerHome.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ProgressBar, Carousel } from 'react-bootstrap';
import NavBar from './NavBar';
import AboutUs from './AboutUs';
import './ManagerHome.css';

function ManagerHome() {
  const [complaints, setComplaints] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [managerName, setManagerName] = useState('Manager Name');
  const [complaintsLoading, setComplaintsLoading] = useState(true);
  const [repairsLoading, setRepairsLoading] = useState(true);
  const [highlights, setHighlights] = useState([]);
  const [highlightsLoading, setHighlightsLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const fetchData = async (url, setterFunction, setLoadingFunction) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setterFunction(data);
      } else {
        console.error(`Failed to fetch data from ${url}`);
      }
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    } finally {
      setLoadingFunction(false);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setComplaintsLoading(true);
      await fetchData('http://localhost:3001/get-complaints', setComplaints, setComplaintsLoading);

      setRepairsLoading(true);
      await fetchData('http://localhost:3001/get-repairs', setRepairs, setRepairsLoading);

      setHighlightsLoading(true);
      await fetchData('http://localhost:3001/get-highlights', setHighlights, setHighlightsLoading);
    };

    fetchAllData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/delete-complaint/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Complaint deleted successfully.');
        fetchData('http://localhost:3001/get-complaints', setComplaints, setComplaintsLoading); // Refresh the complaints after deletion
      } else {
        console.error('Failed to delete complaint');
      }
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  return (
    <main>
      <NavBar onLogout={handleLogout} />
      <Carousel>
        {highlights.map((highlight, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={highlight.image}
              alt={`Highlight ${index + 1}`}
            />
            <Carousel.Caption>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <section className="manager-name">{managerName}</section>
      <section style={{ backgroundColor: "white", padding: "20px" }}>
        <h2>Dashboard</h2>
        <section style={{ marginRight: "20px" }}>
        <h3>Complaints Information</h3>
        <section className="top-content">
          {complaintsLoading ? (
            <p>Loading complaints...</p>
          ) : (
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
          )}
          </section>
          </section>
          <section>
        <h3>Progress of Repairs</h3>
          {repairsLoading ? (
            <p>Loading repairs...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Train No</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((repair) => (
                  <tr key={repair.trainId}>
                    <td>{repair.trainId}</td>
                    <td>
                      <ProgressBar now={repair.progress} label={`${repair.progress}%`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          </section>
        </section>
      <AboutUs />
    </main>
  );
}

export default ManagerHome;
