import React, { useState } from 'react';
import './Orders.css';
import NavBar from './manager/NavBar';

function Orders() {
  const [orders, setOrders] = useState([
    { id: 1, date: '05/09/2020', employeeName: 'Wade Warren', itemName: 'Product A', price: '$523', status: 'Pending' },
    { id: 2, date: '28/08/2020', employeeName: 'Jenny Wilson', itemName: 'Product B', price: '$782', status: 'Delivered' },
    // ... more orders
  ]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ date: '', employeeName: '', itemName: '', price: '', status: '' });
  const [searchTerm, setSearchTerm] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const priceRegex = /^\$\d+(\.\d{0,2})?$/;

  const validatePrice = (price) => priceRegex.test(price);

  const validateFields = () => {
    const { employeeName, itemName, status } = newOrder;
    return employeeName && itemName && status && validatePrice(newOrder.price);
  };

  const handleAddOrderClick = () => {
    setNewOrder({ ...newOrder, date: getCurrentDate() });
    setShowAddModal(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
    setEditingOrderId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const submitAddOrder = () => {
    if (!validateFields()) {
      alert('Please fill out all fields with valid information, including Employee Name, Item Name, and Status.');
      return;
    }
    setOrders([...orders, { ...newOrder, id: orders.length + 1 }]);
    setShowAddModal(false);
    setNewOrder({ date: '', employeeName: '', itemName: '', price: '', status: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleDelete = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setOrders(orders.filter(order => 
      order.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  // JSX for Add Order Modal
  const renderAddOrderModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Order</h2>
        <form>
          <input
            type="text"
            name="date"
            value={newOrder.date}
            onChange={handleInputChange}
            placeholder="Date (DD/MM/YYYY)"
            readOnly // Making the date field read-only
          />
          <input
            type="text"
            name="employeeName"
            value={newOrder.employeeName}
            onChange={handleInputChange}
            placeholder="Employee Name"
          />
          <input
            type="text"
            name="itemName"
            value={newOrder.itemName}
            onChange={handleInputChange}
            placeholder="Item Name"
          />
          <input
            type="text"
            name="price"
            value={newOrder.price}
            onChange={handleInputChange}
            placeholder="Price (e.g., $123.45)"
          />
          <select
            name="status"
            value={newOrder.status}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>
          <div className="modal-actions">
            <button type="button" onClick={submitAddOrder}>Submit New Order</button>
            <button type="button" onClick={() => setShowAddModal(false)}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="orders-container">
      <NavBar onLogout={handleLogout} />
      <header className="orders-header">
        <h1>Orders Management</h1>
        <button onClick={handleAddOrderClick}>Add Order</button>
      </header>
      
      <div className="orders-filters">
        <input type="text" placeholder="Search for..." onChange={handleSearchChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
  
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order No.</th>
            <th>Date</th>
            <th>Employee Name</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.date}</td>
              <td>{order.employeeName}</td>
              <td>{order.itemName}</td>
              <td>{order.price}</td>
              <td>
                {editingOrderId === order.id ? (
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    onBlur={() => setEditingOrderId(null)}
                  >
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                ) : (
                  <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                )}
              </td>
              <td>
                {editingOrderId !== order.id && (
                  <button onClick={() => setEditingOrderId(order.id)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <footer className="orders-pagination">
        {/* Pagination controls can be added here */}
      </footer>
  
      {showAddModal && renderAddOrderModal()}
    </div>
  );
}

export default Orders;
