const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  passport = require('passport');



const Chat = require("../models/Chat");
const User = require('../models/User');

const router = express.Router();

router.post("/"  , passport.authenticate("jwt", {session: false}) , async(req, res) => {
    
        const { userId } = req.body;
      
        if (!userId) {
          console.log("UserId param not sent with request");
          return res.sendStatus(400);
        }
      
        var isChat = await Chat.find({
          isGroupChat: false,
          $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
          ],
        })
          .populate("users", "-password")
          .populate("latestMessage");
      
        isChat = await User.populate(isChat, {
          path: "latestMessage.sender",
          select: "name",
        });
      
        if (isChat.length > 0) {
          res.send(isChat[0]);
        } else {
          var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
          };
      
          try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
              "users",
              "-password"
            );
            res.status(200).json(FullChat);
          } catch (error) {
            res.status(400);
            throw new Error(error.message);
          }
        }
      });
    


router.get("/"  ,  passport.authenticate("jwt", {session: false}),async(req, res) => {

    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
          .populate("users", "-password")
          .populate("groupAdmin", "-password")
          .populate("latestMessage")
          .sort({ updatedAt: -1 })
          .then(async (results) => {
            results = await User.populate(results, {
              path: "latestMessage.sender",
              select: "name",
            });
            res.status(200).send(results);
          });
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    });


module.exports = router;