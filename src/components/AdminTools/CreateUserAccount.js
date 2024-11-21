// CreateUserAccount.js
import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Input,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";

const CreateUserAccount = () => {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [userType, setUserType] = useState("regular");
  const toast = useToast();

  // Function to generate a random 16-character password
  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleCreateAccount = async () => {
    if (newUserEmail.trim() === "") {
      toast({
        title: "Please enter an email address.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (userType.trim() === "") {
      toast({
        title: "Please select a user type.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const randomPassword = generateRandomString(16);
    const randomUsername = `user_${generateRandomString(8)}`;

    try {
        console.log(newUserEmail);
      const response = await fetch("http://localhost:8080/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: randomUsername,
          email: newUserEmail,
          password: randomPassword,
          type: userType,
          Bio: 'Tell us about yourself!',
          profile_picture: '',
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user account.");
      }

      // Success message and clear input field
      toast({
        title: `User account for ${newUserEmail} created successfully.`,
        description: `Username: ${randomUsername}, Password: ${randomPassword}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setNewUserEmail("");
      setUserType("regular");
    } catch (error) {
      toast({
        title: `Error creating account for ${newUserEmail}.`,
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg="#E1CBAA"
      borderRadius="md"
      boxShadow="md"
      p={4}
      border="1px"
      borderColor="#d69b75"
    >
      <Text fontSize="1.5rem" mb={4} color="#6a0202">
        Create User Account
      </Text>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Enter user email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          bg="white"
          borderColor="#d69b75"
          _placeholder={{ color: "gray.500" }}
        />
        <Select
          placeholder="Select user type"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          bg="white"
          borderColor="#d69b75"
        >
          <option value="regular">Regular</option>
          <option value="admin">Admin</option>
        </Select>
        <Button colorScheme="green" onClick={handleCreateAccount}>
          Create Account
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateUserAccount;
