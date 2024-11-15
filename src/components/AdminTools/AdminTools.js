import {
  Box,
  Flex,
  Text,
  VStack,
  Button,
  HStack,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Sidebar from "../Navbar/Sidebar";
import CreateAnnouncement from "../Notifications/CreateAnnouncement";
import CreateEvent from "../Notifications/CreateEvent"
import ReportReview from "./ReportReview";

const AdminTools = ({ userData }) => {
  // const [userToBan, setUserToBan] = useState("");
  const [bannedUsers, setBannedUsers] = useState([]);
  const [unbannedUsers, setUnbannedUsers] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetch(`http://localhost:8080/banned_users`)
      .then((response) => response.json())
      .then((data) => {
        const emails = data.map((userEmail) => userEmail.email);
        setBannedUsers(emails);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/unbanned_users`)
      .then((response) => response.json())
      .then((data) => {
        const emails = data.map((userEmail) => userEmail.email);
        setUnbannedUsers(emails);
      });
  }, []);


  const handleBanUser = async (userToBan) => {
    if (userToBan) {
      // Check if user exists in the user table
      if (!unbannedUsers.includes(userToBan)) {
        toast({
          title: `User ${userToBan} does not exist.`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/ban-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userToBan }), // Send the email of the user to ban
        });

        if (!response.ok) {
          throw new Error(`Failed to ban user: ${response.statusText}` );
        }

        // If ban was successful, update the banned users list and clear the input
        setUnbannedUsers(unbannedUsers.filter((unbannedUser) => unbannedUser !== userToBan));
        setBannedUsers([...bannedUsers, userToBan]);
        // setUserToBan(""); // Clear input
        toast({
          title: `User ${userToBan} banned successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error banning user:", error); // Log error for debugging
        toast({
          title: `Error banning user ${userToBan}`,
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Please enter a user to ban.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };


  const handleUnbanUser = async (user) => {
    try {
      const response = await fetch("http://localhost:8080/unban-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user }), // Send the email of the user to unban
      });

      if (!response.ok) {
        throw new Error("Failed to unban user");
      }

      // If unban was successful, update the banned users list and show success message
      setBannedUsers(bannedUsers.filter((bannedUser) => bannedUser !== user));
      setUnbannedUsers([...unbannedUsers, user]);
      toast({
        title: `User ${user} unbanned successfully.`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `Error unbanning user ${user}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="100vh">
      <Sidebar userType={userData.user_type} />
      <Box flex="1" p="5" height="100%" overflowY="auto">
        <VStack spacing={6} align="stretch">
          {/* Announcements Section */}
          <Box
            bg="#E1CBAA"
            borderRadius="md"
            boxShadow="md"
            p={4}
            border="1px"
            borderColor="#d69b75"
          >
            <Text fontSize="1.5rem" mb={4} color="#6a0202">
              Manage Announcements
            </Text>
            <CreateAnnouncement />
          </Box>

          {/* Events Section */}
          <Box
            bg="#E1CBAA"
            borderRadius="md"
            boxShadow="md"
            p={4}
            border="1px"
            borderColor="#d69b75"
          >
            <Text fontSize="1.5rem" mb={4} color="#6a0202">
              Create Events
            </Text>
            <CreateEvent />
          </Box>

          {/* Ban Users Section */}
          <Box
            bg="#E1CBAA"
            borderRadius="md"
            boxShadow="md"
            p={4}
            border="1px"
            borderColor="#d69b75"
          >
            <Text fontSize="1.5rem" mb={4} color="#6a0202">
              Ban Users
            </Text>

            {/* Unbanned Users Section */}
            <Box>
              <Text fontSize="1.25rem" mb={2} color="#2a4d69">
                Current Users
              </Text>
              <List
                mt={2}
                spacing={3}
                maxHeight="200px"
                overflowY="auto"
                p={2}
                border="1px solid"
                borderColor="#d69b75"
                borderRadius="md"
              >
                {unbannedUsers.length > 0 ? (
                  unbannedUsers.map((user, index) => (
                    <ListItem key={index}>
                      <HStack justify="space-between">
                        <Text>{user}</Text>
                        <Button
                          size="sm"
                          colorScheme="orange"
                          onClick={() => handleBanUser(user)}
                        >
                          Ban
                        </Button>
                      </HStack>
                    </ListItem>
                  ))
                ) : (
                  <Text>No unbanned users currently.</Text>
                )}
              </List>
            </Box>

            {/* Banned Users Section */}
            <Box mt={6}>
              <Text fontSize="1.25rem" mb={2} color="#9b2c2c">
                Banned Users
              </Text>
              <List
                mt={2}
                spacing={3}
                maxHeight="200px"
                overflowY="auto"
                p={2}
                border="1px solid"
                borderColor="#d69b75"
                borderRadius="md"
              >
                {bannedUsers.length > 0 ? (
                  bannedUsers.map((user, index) => (
                    <ListItem key={index}>
                      <HStack justify="space-between">
                        <Text>{user}</Text>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleUnbanUser(user)}
                        >
                          Unban
                        </Button>
                      </HStack>
                    </ListItem>
                  ))
                ) : (
                  <Text>No banned users currently.</Text>
                )}
              </List>
            </Box>
          </Box>

          <Box
            bg="#E1CBAA"
            borderRadius="md"
            boxShadow="md"
            p={4}
            border="1px"
            borderColor="#d69b75"
          >
            <ReportReview />
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default AdminTools;
