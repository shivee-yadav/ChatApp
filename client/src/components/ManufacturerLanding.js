import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyChats from "./MyChats";
import axios from "axios";
import io from "socket.io-client";
import { Button, useToast } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const ManufacturerLanding = () => {
  // Fetch and display messages for Manufacturer
  const [selectedOrder, setSelectedOrder] = useState("");
  const [reply, setReply] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [transporter, setTransporter] = useState("");
  const toast = useToast();

  const { selectedChat,  user } =
    ChatState();


  const sendMessage = async (event) => {
    if (
      event.key === "Enter" &&
      selectedOrder &&
      to &&
      from &&
      quantity &&
      transporter &&
      pickupAddress &&
      reply
    ) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setSelectedOrder("");
        setReply("");
        setFrom("");
        setPickupAddress("");
        setQuantity("");
        setTransporter("");
        setTo("");
        const { data } = await axios.post(
          "/api/message/create-message",
          {
            orderId: selectedOrder,
            from: from,
            to: to,
            quantity: quantity,
            pickupAddress: pickupAddress,
            transporter: transporter,
            content: reply,
            chatId: selectedChat,
          },
          config
        );

        setSelectedOrder(data);
        setReply(data);
        setFrom(data);
        setPickupAddress(data);
        setQuantity(data);
        setTransporter(data);
        setTo(data);
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
      <h2>Manufacturer Landing Page</h2>
      {/* Display messages and order list for Manufacturer */}
      <MyChats />
      <div>
        <h3>Messages</h3>
        
      </div>
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
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pickup Address"
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Transporter"
          value={transporter}
          onChange={(e) => setTransporter(e.target.value)}
        />
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={sendMessage}
        >
          Send
        </Button>{" "}
      </div>
    </div>
  );
};

export default ManufacturerLanding;
