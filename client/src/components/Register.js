import React, { useState } from 'react';

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Select } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('');

  const submitHandler = async () => {
   
    if (!username  || !password || !userRole) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
      return;
    }
   
    console.log(username, password, userRole);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/auth/register",
        {
          username,
          password,
          userRole
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      userRole === "Manufacturer"?
      navigate("/manufacturer") :
      navigate("/transporter");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
     
    }
  };

  return (
    <VStack spacing="5px">
    <FormControl id="first-name" isRequired>
      <FormLabel>Name</FormLabel>
      <Input
        placeholder="Enter Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
       </FormControl>
       
       <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
       <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="userRole" isRequired>
        <FormLabel>User Role</FormLabel>
      <Select          placeholder="User Role"
         value={userRole}
         onChange={(e) => setUserRole(e.target.value)}>
        
        <option value="Manufacturer">Manufacturer</option>
        <option value="Transporter">Transporter</option>
      </Select>
      </FormControl>
       <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }} onClick={submitHandler}>Sign Up
        </Button>
    
      </VStack>
  );
};

export default Register;
