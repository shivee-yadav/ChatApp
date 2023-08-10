const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userRole: { type: String, enum: ['Manufacturer', 'Transporter'], required: true }
});



const User = mongoose.model('User', userSchema);

module.exports = User;