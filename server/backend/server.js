const express = require('express');
require("dotenv").config();
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const authRoutes =require("./routes/authRoutes");
const chatRoutes =require("./routes/chatRoutes");
const messageRoutes =require("./routes/messageRoutes");
import routeConfig from './config/routeConfig';
const passport = require('passport');

const PORT = process.env.PORT ;

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true ,  family: 4})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

app.use(cors());
app.use(express.json());
routeConfig(passport);

app.use("/auth",authRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes);

app.get("/", (req,res) => res.json({message: "SetUp Success!!!"}));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
