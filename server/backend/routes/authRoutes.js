const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  passport = require('passport');


const User = require('../models/User'); 


const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password, userRole } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, userRole });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password, userRole } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    const isUserRoleValid = await bcrypt.compare(userRole, user.userRole);
    if (!isPasswordValid && !isUserRoleValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, userRole: user.userRole }, 'ChatApp', { expiresIn: '30d' });
    res.status(200).json({ token });

 
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }});


router.get('/', passport.authenticate("jwt", {session: false}) ,async (req,res) => {
    try {
            const keyword = req.query.search
              ? {
                  $or: [
                    { username: { $regex: req.query.search, $options: "i" } },
                    
                  ],
                }
              : {};
          
              const users = await User.find({
                ...keyword,
                _id: { $ne: req.user._id }
              });
                      res.send(users);
          }
     catch (error) {
        res.status(500).json({ message: 'An error occurred' });
}});

module.exports = router;
