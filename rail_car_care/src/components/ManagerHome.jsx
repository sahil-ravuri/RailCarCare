import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, CardBody, Row, Col, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter, Carousel } from 'react-bootstrap';
import NavBar from './NavBar';
import AboutUs from './AboutUs';
import './ManagerHome.css';
import { useNavigate } from 'react-router-dom';

function ManagerHome() {
  const navigate = useNavigate();
  const [assignId, setAssignId] = useState('');
  const [employees, setEmployees] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterColumn, setFilterColumn] = useState('empId');
  const [filterValue, setFilterValue] = useState('');
  const [trainStatistics, setTrainStatistics] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [assignmentDetails, setAssignmentDetails] = useState({
    assignmentId: '',
    employeeId: '',
    trainNo: '',

  });

  const handleLogout = async () => {
    const response = await fetch('http://localhost:3001/logout');
    if (response.ok) {
      console.log('Inside logout');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'user': localStorage.getItem('user') })
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error('Failed to fetch employees');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }

  };

  useEffect(() => {
    fetchEmployees();
  }, []);

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


  const handleSortAndSearch = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });

    // Perform search on sorted data
    const sortedAndSearchedComplaints = [...employees].sort((a, b) => {
      if (direction === 'ascending') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    }).filter((employee) =>
      employee[filterColumn].toLowerCase().includes(filterValue.toLowerCase())
    );

    setComplaints(sortedAndSearchedComplaints);
  };

  const handleFilter = () => {
    const filteredEmployees = employees.filter((employee) =>
      employee[filterColumn].toLowerCase().includes(filterValue.toLowerCase())
    );
    setEmployees(filteredEmployees);
  };

  const handleClearFilter = () => {
    setFilterColumn('empId');
    setFilterValue('');
    fetchEmployees();
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

  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  const handleAssign = (employee) => {
    setSelectedEmployee(employee);
    setShowAssignModal(true);
    const assign = generateRandomAssignmentId();
    setAssignId(assign);
  };

  const handleAssignModalClose = () => {
    setShowAssignModal(false);
    setSelectedEmployee(null);
    setAssignmentDetails({
      assignmentId: '',
      // Reset other assignment details here
    });
  };

  const generateRandomAssignmentId = () => {
    // Generate a random 6-digit assignment ID
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleAssignSubmit = () => {

    // Save the assignment details to the Assignments table (Assuming you have a separate Assignments page)
    // You can send a POST request to your server with the assignment details.

    // For example:
    // const response = await fetch('http://localhost:3001/create-assignment', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     assignmentId: randomAssignmentId,
    //     // Include other assignment details from the state
    //   }),
    // });

    // Close the modal and reset state
    handleAssignModalClose();
  };

  return (
    <section>
      <NavBar onLogout={handleLogout} />
      <section className='carousel'>
        <Carousel>
          <Carousel.Item>
            <img
              src="./images/Train-Repair-1.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="./images/Train-Repair-2.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
      </section>
      <Row>
        <Col md={6}>
          <Card>
            <CardBody>
              <h2>Employee Status</h2>
              <div className="filter">
                <label>
                  Filter By:
                  <select
                    value={filterColumn}
                    onChange={(e) => setFilterColumn(e.target.value)}
                  >
                    <option value="empId">Employee Id</option>
                    <option value="empFirstName">Employee Name</option>
                    <option value="department">Employee Department</option>
                    <option value="status">Employee Status</option>
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
                {sortedEmployees.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th onClick={() => handleSortAndSearch('empId')}>Employee Id</th>
                        <th onClick={() => handleSortAndSearch('empFirstName')}>Employee Name</th>
                        <th onClick={() => handleSortAndSearch('department')}>Department</th>
                        <th onClick={() => handleSortAndSearch('status')}>Status</th>
                        <th>Assign</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedEmployees.map((employee, index) => (
                        <tr key={employee._id}>
                          <td>{employee.empId}</td>
                          <td>{employee.empFirstName}</td>
                          <td>{employee.department}</td>
                          <td>{employee.status}</td>
                          <td>
                            <Button variant="primary" onClick={() => handleAssign(employee.empId)}>
                              Assign
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
      <Modal show={showAssignModal} onHide={handleAssignModalClose}>
        <ModalHeader closeButton>
          <ModalTitle>Assign Task</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group controlId="formAssignmentId">
              <Form.Label>Assignment ID</Form.Label>
              <Form.Control
                name="assignId"
                type="text"
                value={assignId}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formAssignmentId">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                name="empId"
                type="text"
                value={selectedEmployee}
                readOnly
              />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleAssignModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAssignSubmit}>
            Save Assignment
          </Button>
        </ModalFooter>
      </Modal>
      <AboutUs />
      </section>
  );
}

export default ManagerHome;