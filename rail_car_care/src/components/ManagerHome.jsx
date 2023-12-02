import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, Row, Col } from 'react-bootstrap';
import NavBar from './NavBar';
import AboutUs from './AboutUs';
import './ManagerHome.css';
import { useNavigate } from 'react-router-dom';

function ManagerHome() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterColumn, setFilterColumn] = useState('trainNo');
  const [filterValue, setFilterValue] = useState('');
  const [trainStatistics, setTrainStatistics] = useState([]);

  const handleLogout = async () => {
    const response = await fetch('http://localhost:3001/logout');
    if (response.ok) {
      console.log('Inside logout');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-complaints');
      if (response.ok) {
        const data = await response.json();
        setComplaints(data);
        const uniqueTrains = [...new Set(data.map((complaint) => complaint.trainNo))];
        setTrainStatistics(uniqueTrains.map((train) => ({
          trainNo: train,
          totalRepairs: 0,
          assignedRepairs: 0,
          pendingRepairs: 0,
          completedRepairs: 0,
        })));
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

  const handleSortAndSearch = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });

    // Perform search on sorted data
    const sortedAndSearchedComplaints = [...complaints].sort((a, b) => {
      if (direction === 'ascending') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    }).filter((complaint) =>
      complaint[filterColumn].toLowerCase().includes(filterValue.toLowerCase())
    );

    setComplaints(sortedAndSearchedComplaints);
  };

  const handleFilter = () => {
    const filteredComplaints = complaints.filter((complaint) =>
      complaint[filterColumn].toLowerCase().includes(filterValue.toLowerCase())
    );
    setComplaints(filteredComplaints);
  };

  const handleClearFilter = () => {
    setFilterColumn('trainNo');
    setFilterValue('');
    fetchComplaints();
  };

  const calculateTrainStatistics = () => {
    // Calculate statistics for each train
    trainStatistics.forEach((trainStat) => {
      const trainComplaints = complaints.filter((complaint) => complaint.trainNo === trainStat.trainNo);
      trainStat.totalRepairs = trainComplaints.length;
      trainStat.assignedRepairs = trainComplaints.filter((complaint) => complaint.status === 'Assigned').length;
      trainStat.pendingRepairs = trainComplaints.filter((complaint) => complaint.status === 'Pending').length;
      trainStat.completedRepairs = trainComplaints.filter((complaint) => complaint.status === 'Completed').length;
    });

    setTrainStatistics([...trainStatistics]); // Update state to trigger a re-render
  };

  useEffect(() => {
    calculateTrainStatistics();
  }, [complaints]);

  const sortedComplaints = [...complaints].sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  return (
    <div>
      <NavBar onLogout={handleLogout} />
        <Row>
          <Col md={6}>
          <Card>
            <CardBody>
              <h2>Complaints</h2>
            <div className="filter">
          <label>
            Filter By:
            <select
              value={filterColumn}
              onChange={(e) => setFilterColumn(e.target.value)}
            >
              <option value="trainNo">Train No</option>
              <option value="coachType">Coach Type</option>
              <option value="issueType">Issue Type</option>
              <option value="issueLocation">Issue Location</option>
              <option value="description">Description</option>
            </select>
          </label>
          <input
            type="text"
            placeholder="Filter value..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <button onClick={handleFilter}>Filter</button>
          <button onClick={handleClearFilter}>Clear Filter</button>
        </div>
        <div className='table-container'>
        {sortedComplaints.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSortAndSearch('trainNo')}>Train No</th>
                <th onClick={() => handleSortAndSearch('coachType')}>CoachType</th>
                <th onClick={() => handleSortAndSearch('issueType')}>Issue Type</th>
                <th onClick={() => handleSortAndSearch('issueLocation')}>Issue Location</th>
                <th onClick={() => handleSortAndSearch('description')}>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedComplaints.map((complaint, index) => (
                <tr key={complaint._id}>
                  <td>{complaint.trainNo}</td>
                  <td>{complaint.coachType}</td>
                  <td>{complaint.issueType}</td>
                  <td>{complaint.issueLocation}</td>
                  <td>{complaint.description}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(complaint._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items found.</p>
        )}
      </div>
            </CardBody>
          </Card>
          </Col>
          <Col md={6}>
          <Card>
            <CardBody>
            <h2>Train Statistics</h2>
        <table>
          <thead>
            <tr>
              <th>Train No</th>
              <th>Total Repairs</th>
              <th>Assigned Repairs</th>
              <th>Pending Repairs</th>
              <th>Completed Repairs</th>
            </tr>
          </thead>
          <tbody>
            {trainStatistics.map((trainStat) => (
              <tr key={trainStat.trainNo}>
                <td>{trainStat.trainNo}</td>
                <td>{trainStat.totalRepairs}</td>
                <td>{trainStat.assignedRepairs}</td>
                <td>{trainStat.pendingRepairs}</td>
                <td>{trainStat.completedRepairs}</td>
              </tr>
            ))}
          </tbody>
        </table>
            </CardBody>
          </Card>
          </Col>
        </Row>
      <AboutUs />
    </div>
  );
}

export default ManagerHome;
