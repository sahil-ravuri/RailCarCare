// UnassignedTasksModal.jsx
import React from 'react';
import Modal from 'react-modal';

const UnassignedTasksModal = ({ isOpen, closeModal, unassignedOrders }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Unassigned Tasks"
    >
      <h2>Unassigned Tasks</h2>
      <ul>
        {unassignedOrders.map((order) => (
          <li key={order._id}>
            {order.trainNo} - {order.coachType}
          </li>
        ))}
      </ul>
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};

export default UnassignedTasksModal;
