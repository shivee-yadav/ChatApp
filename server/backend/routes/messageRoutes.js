const express = require('express');
const jwt = require('jsonwebtoken');

const Message = require('../models/Messages');
const MessageTrans = require('../models/MessageTrans');
const User = require('../models/User');
const Chat = require('../models/Chat');
const router = express.Router();

// Create a new message using Message model
router.post('/create-message', async (req, res) => {
  try {
    const { orderId, from, to, quantity, pickupAddress, transporter, content, chatId } = req.body;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'ChatApp');
    
    if (decodedToken.userRole === 'Manufacturer') {
      const message = new Message({ orderId, from, to, quantity, pickupAddress, transporter, sender: chatId, content, chat: chatId });
      await message.save();

     let popMessage= await  message.populate("chat");
      let populatedMessage = await popMessage.populate("sender", "username");
      populatedMessage = await User.populate(populatedMessage, {
        path: "chat.users",
        select: "username",
      });

      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: populatedMessage });

      return res.status(201).json({ message: 'Message sent successfully' });
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new message using MessageTrans model
router.post('/create-message-trans', async (req, res) => {
  try {
    const { orderId, price, content, chatId } = req.body;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'ChatApp');

    
    if (decodedToken.userRole === 'Transporter') {
      const messageTrans = new MessageTrans({ orderId, price, sender: decodedToken.userId, content, chat: chatId });
      await messageTrans.save();

      return res.status(201).json({ message: 'Message sent successfully' });
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
