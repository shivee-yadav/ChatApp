const mongoose = require('mongoose');


const messageSchemaTrans = new mongoose.Schema({
    orderId: { type: String, required: true },
    price: { type:Number, required:true},
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
  
  );
  
  const MessageTrans = mongoose.model('MessageTrans', messageSchemaTrans);
  
  module.exports = MessageTrans;
  