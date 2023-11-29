import React, { useState } from 'react';
import './Orders.css';

function Orders() {
  // Sample data for the table
  const [orders, setOrders] = useState([
    { id: 1, date: '05/09/2020', customerName: 'Wade Warren', email: 'wadewarren@gmail.com', price: '$523', status: 'Pending' },
    { id: 2, date: '28/08/2020', customerName: 'Jenny Wilson', email: 'jennyw79@gmail.com', price: '$782', status: 'Delivered' },
    // ... add more orders as needed
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  // Function to handle adding a new order
  const handleAddOrderClick = () => {
    setShowAddModal(true);
  };

  // Function to handle editing an existing order
  const handleEdit = (orderId) => {
    setCurrentEditId(orderId);
    setShowEditModal(true);
  };

  // Function to handle deleting an order
  const handleDelete = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  // Function to submit the new order form
  const submitAddOrder = (newOrderData) => {
    // Here you would handle adding the new order to your state or sending it to your backend
    setShowAddModal(false);
  };

  // Function to submit the edit order form
  const submitEditOrder = (editOrderData) => {
    // Here you would handle updating the order in your state or sending the update to your backend
    setShowEditModal(false);
  };

  return (
    <div className="orders-container">
      <header className="orders-header">
        <h1>Orders Management</h1>
        <button onClick={handleAddOrderClick}>Add Order</button>

      </header>
      
      <div className="orders-filters">
        <input type="text" placeholder="Search for..." />
        <select>{/* Category options */}</select>
        <select>{/* Status options */}</select>
        <select>{/* Price options */}</select>
        <select>{/* Date options */}</select>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order No.</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.customerName}</td>
              <td>{order.email}</td>
              <td>{order.price}</td>
              <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(order.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="orders-pagination">
        {/* Pagination controls */}
      </footer>

      {/* Add Order Modal */}
      {showAddModal && (
        <div className="modal">
          {/* The contents of your add order modal go here */}
          <button onClick={() => submitAddOrder(/* new order data */)}>Submit New Order</button>
          <button onClick={() => setShowAddModal(false)}>Close</button>
        </div>
      )}

      {/* Edit Order Modal */}
      {showEditModal && (
        <div className="modal">
          {/* The contents of your edit order modal go here */}
          <button onClick={() => submitEditOrder(/* edited order data */)}>Submit Edits</button>
          <button onClick={() => setShowEditModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Orders;
