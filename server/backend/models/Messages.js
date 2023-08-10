const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  quantity: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  transporter: { type: String },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, trim: true },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},
{ timestamps: true }

);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
