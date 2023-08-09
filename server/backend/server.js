const dotenv = require('dotenv')
const express = require('express')
dotenv.config();

const app = express()
const port = process.env.PORT

const {chats} = require("./data/data");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/api/chat", (req, res) => {
  res.send(chats);
 
  
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
  //console.log(req.params.id);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})