import { Box, Flex, Text, Button, VStack, Avatar } from "@chakra-ui/react";
import Sidebar from "../Navbar/Sidebar";
import BioSection from "../Profile/BioSection";
import PostsSection from "../Profile/PostsSection";
import ProfileSection from "../Profile/ProfileSection";

export default function Profile() {
  return (
  <Flex height="100vh">
    <Sidebar />
    <BioSection />
    <PostsSection />
    <ProfileSection />
  </Flex>
  );
};
