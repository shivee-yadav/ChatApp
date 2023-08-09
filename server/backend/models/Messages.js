const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  quantity: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  transporter: { type: String }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
