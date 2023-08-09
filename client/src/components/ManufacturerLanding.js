import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManufacturerLanding = () => {
  // Fetch and display messages for Manufacturer
  const [messages, setMessages] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [reply, setReply] = useState('');
  const [from, setFrom] = useState('');
const [to, setTo] = useState('');
const [quantity, setQuantity] = useState('');
const [pickupAddress, setPickupAddress] = useState('');
const [transporter, setTransporter] = useState('');

const handleCreateMessage = () => {
  // Implement your create message logic here
};

useEffect(() => {
    // Fetch messages and populate the messages state
    // Example API call (replace with actual API call)
    fetch('/api/messages')
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error('Error fetching messages:', error));
  }, []);

  const handleReply = () => {
    // Implement your reply logic here
  };

  return (
    <div>
      <h2>Manufacturer Landing Page</h2>
      {/* Display messages and order list for Manufacturer */}
      <div>
        <h3>Messages</h3>
        <ul>
          {messages.map((message) => (
            <li key={message.orderId}>
              <button onClick={() => setSelectedOrder(message.orderId)}>
                Order ID: {message.orderId}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
      <h3>Create Message</h3>
      <input
        type="text"
        placeholder="Order ID"
        value={selectedOrder}
        onChange={(e) => setSelectedOrder(e.target.value)}
      />
      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Pickup Address"
        value={pickupAddress}
        onChange={(e) => setPickupAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Transporter"
        value={transporter}
        onChange={(e) => setTransporter(e.target.value)}
      />
      <button onClick={handleCreateMessage}>Create Message</button>
    </div>
    </div>
  );
};

export default ManufacturerLanding;
