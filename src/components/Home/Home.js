import {Box, Flex, Text, Button, VStack, HStack, Avatar } from "@chakra-ui/react";
import Sidebar from '../Navbar/Sidebar'

const Home = () => {
  return (
    <Flex height="100vh">
      <Sidebar />
      {/* Main Content */}
      <Box flex="1" p="5" height="100%" overflowY="auto">
        {/* Header */}
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
              <img src="/images/community-icon.png" width="75" />
              <Box>
                <Text fontSize="3xl" fontWeight="bold">
                  Waldo's Community
                </Text>
                <Text>Let's make art together</Text>
              </Box>
            </HStack>
          </Box>
        </Box>

        {/* Post Box */}
        <Box mb="6" p="4" bg="#F6DEB5" shadow="sm" rounded="md">
          <Flex align="center">
            <Avatar size="md" mr="4" />
            <Button w="full" colorScheme="orange" variant="outline">
              Share something with the community
            </Button>
          </Flex>
        </Box>

        {/* New Posts / Activities */}
        <Flex justify="space-between">
          {/* Activity Feed */}
          <Box w="65%" bg="#F6DEB5" shadow="sm" rounded="md" p="4">
            <Flex justify="space-between" mb="3">
              <Text fontWeight="bold">Newest activities</Text>
              <Text color="gray.500" cursor="pointer">
                New posts
              </Text>
            </Flex>
            <Box bg="gray.100" p="4" rounded="md">
              <Text fontWeight="bold">Random Username</Text>
              <Text color="gray.500">@admin</Text>
              <Text fontSize="xl" mt="2">
                Topic: New events!!
              </Text>
              <Text>
                Waldo's is inviting you to be a part of this art community
              </Text>
            </Box>
          </Box>

          {/* Upcoming Events */}
          <Box w="30%" bg="#F6DEB5" shadow="sm" rounded="md" p="4">
            <Text fontWeight="bold" mb="4">
              Upcoming Events
            </Text>
            <VStack align="start" spacing="4">
              <Box
                textAlign="center"
                w="full"
                bg="orange.400"
                color="white"
                p="3"
                rounded="md"
              >
                <Text fontWeight="bold" fontSize="2xl">
                  Sep 25
                </Text>
                <Text>Waldo's Friendraiser</Text>
              </Box>
              <Box
                textAlign="center"
                w="full"
                bg="orange.400"
                color="white"
                p="3"
                rounded="md"
              >
                <Text fontWeight="bold" fontSize="2xl">
                  Sep 25
                </Text>
                <Text>Waldo's Friendraiser</Text>
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;


