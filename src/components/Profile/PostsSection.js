

import { Box, Flex, Image, Text, Heading } from "@chakra-ui/react";

const PostsSection = () => {
  return (
    <Box
      bg="#F6DEB5"
      p="20px"
      borderRadius="10%"
      color="#6a0202"
      fontFamily="'Petrona', serif"
      rounded='md'
    >
      <Flex align="flex-start">
        <Image
          src="/images/avatar.jpg"
          alt="Avatar"
          borderRadius="50%"
          boxSize="50px"
          mr="15px"
        />
        <Box flexGrow={1}>
          <Flex justify="space-between" align="center">
            <Heading
              as="h5"
              color="#6a0202"
              fontSize="1.1rem"
              fontWeight="bold"
            >
              Random Username
              <Text as="span" color="#d69b75" fontSize="0.9rem" ml="5px">
                @admin
              </Text>
            </Heading>
            <Text fontSize="1.5rem" color="red" ml="5px">
              •
            </Text>
          </Flex>
          <Heading
            as="h6"
            mt="5px"
            color="#6a0202"
            fontSize="1.2rem"
            fontWeight="bold"
          >
            Topic: New events!!
          </Heading>
          <Text mt="10px" color="#6a0202" fontSize="1rem">
            Waldo’s is inviting you to be a part of this art community.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PostsSection;

