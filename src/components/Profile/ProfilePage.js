import {
  Box,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ProfileSection from "../Profile/ProfileSection";
import BioSection from "../Profile/BioSection";
import PostsSection from "../Profile/PostsSection";
import Sidebar from "../Navbar/Sidebar";
import CreateAnnouncement from "../Notifications/CreateAnnouncement";

const ProfilePage = ({userData}) => {
  const isAdmin = JSON.parse(window.localStorage.getItem("userData")).user_type === 'admin'
  return (
    <Flex height="100vh">
      <Sidebar userType={userData.user_type} />
      <Box flex="1" p="5" height="100%" overflowY="auto">
        <ProfileSection />
        <Flex>
          <Box flex="2" mr="5">
            <BioSection />
          </Box>
          <Box
            w="80%"
            bg="#E1CBAA"
            borderRadius="md"
            boxShadow="md"
            p={4}
            border="1px"
            borderColor="#d69b75"
          >
            <VStack spacing={4} align="stretch">
              <Box mb={4}>
                <Text fontSize="1.2rem" color="#6a0202" textAlign="left">
                  Posts (1)
                </Text>
              </Box>
              <Box flex="1">
                {" "}
                {/* Changed from flex="8" to flex="1" for proper alignment */}
                <PostsSection />
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
