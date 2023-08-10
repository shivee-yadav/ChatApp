import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyChats from "./MyChats";
import axios from "axios";
import io from "socket.io-client";
import { Button, useToast } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const TransporterLanding = () => {
  // Fetch and display messages for Transporter
  const [reply, setReply] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [price, setPrice] = useState("");
  const toast = useToast();

  const { selectedChat,  user } =
    ChatState();

  const sendMessage = async (event) => {
    if (event.key === "Enter" && selectedOrder && price && reply)  {
      
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setPrice("");setReply("");setSelectedOrder("");
        const { data } = await axios.post(
          "/api/message/create-message-trans",
          {
            orderId:selectedOrder,
            price:price,
            content: reply,
            chatId: selectedChat,
          },
          config
        );
        
        setPrice(data);setReply(data);setSelectedOrder(data);
        
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };


  return (
    <div>
      <h2>Transporter Landing Page</h2>

      {/* Display messages and order list for Transporter */}
      <div>
        <div>
          <h3>Create Message</h3>
          <input
            type="text"
            placeholder="Order ID"
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <textarea
          rows="4"
          cols="50"
          placeholder="Enter your reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default TransporterLanding;
