import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import UnassignedTasksModal from './UnassignedTasksModal';
import NavBar from './NavBar';
import './Assignments.css';

const AssignOrder = () => {
  const [unassignedOrders, setUnassignedOrders] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await fetch('http://localhost:3001/get-unassigned-orders');
        const techniciansResponse = await fetch('http://localhost:3001/get-technicians');

        if (ordersResponse.ok && techniciansResponse.ok) {
          const ordersData = await ordersResponse.json();
          const techniciansData = await techniciansResponse.json();

          setUnassignedOrders(ordersData);
          setTechnicians(techniciansData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignOrder = async () => {
    try {
      if (!selectedOrder || !selectedTechnician) {
        alert('Please select an order and a technician.');
        return;
      }

      const response = await fetch(`http://localhost:3001/assign-order/${selectedOrder}/${selectedTechnician}`, {
        method: 'PUT',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Order assigned successfully.');
          setSelectedOrder('');
          setSelectedTechnician('');
          fetchUnassignedOrders();
        } else {
          alert('Failed to assign order.');
        }
      } else {
        console.error('Failed to assign order.');
      }
    } catch (error) {
      console.error('Error assigning order:', error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchUnassignedOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-unassigned-orders');

      if (response.ok) {
        const data = await response.json();
        setUnassignedOrders(data);
      } else {
        console.error('Failed to fetch unassigned orders');
      }
    } catch (error) {
      console.error('Error fetching unassigned orders:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <NavBar onLogout={handleLogout} />
    <div style={{ backgroundColor: "white", padding: "20px" }}>
      <h2>Assign Order</h2>
      <select value={selectedOrder} onChange={(e) => setSelectedOrder(e.target.value)}>
        <option value="">Select Order</option>
        {unassignedOrders.map((order) => (
          <option key={order._id} value={order._id}>
            {order.trainNo} - {order.coachType}
          </option>
        ))}
      </select>
      <select value={selectedTechnician} onChange={(e) => setSelectedTechnician(e.target.value)}>
        <option value="">Select Technician</option>
        {technicians.map((technician) => (
          <option key={technician._id} value={technician._id}>
            {technician.name}
          </option>
        ))}
      </select>
      <Button onClick={handleAssignOrder}>Assign Order</Button>
      <Button onClick={openModal}>View Unassigned Tasks</Button>

      <UnassignedTasksModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        unassignedOrders={unassignedOrders}/>
    </div>
    </main>
  );
};

export default AssignOrder;