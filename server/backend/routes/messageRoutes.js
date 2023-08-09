const express = require('express');
const jwt = require('jsonwebtoken');

const Message = require('../models/Message'); // Create this model

const router = express.Router();

// Create a new message
router.post('/create-message', async (req, res) => {
  try {
    const { orderId, from, to, quantity, pickupAddress, transporter } = req.body;

    // Authenticate user and check role
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secretKey');
    if (decodedToken.role !== 'Manufacturer') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const message = new Message({ orderId, from, to, quantity, pickupAddress, transporter });
    await message.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Retrieve messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = router;
