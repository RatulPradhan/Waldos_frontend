import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import React from "react";
import "../../styles/ProfileSection.css";

const ProfileSection = () => {
  const username = JSON.parse(window.localStorage.getItem("userData")).username;
  return (
    <Box
      bg="#F6DEB5"
      // p="6"
      mb="4"
      rounded="md"
      height="250px"
    >
      <Box
        p="6"
        mb="3"
        rounded="md"
        bgImage="/images/wallpaper2.jpg"
        bgSize="cover"
        bgPos="top"
        height="150px"
      />
      <Box padding="0px 25px">
        <HStack>
          <img src="/images/avatar.jpg" width="75" className="profile-avatar" />
          <Box>
            <Text fontSize="3xl" fontWeight="bold">
              {username}
            </Text>
            <Text>1 Following · 3 Followers</Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProfileSection;
