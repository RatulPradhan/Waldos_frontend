

import { Box, Heading, Text } from "@chakra-ui/react";

const BioSection = () => {
  return (
    <Box
      bg="#F6DEB5"
      p="10px"
      borderRadius="10%"
      color="#6a0202"
      fontFamily="'Petrona', serif"
      fontSize="1rem"
      w="100%"
      maxW="220px"
    >
      <Heading
        as="h4"
        bg="#dd907a"
        color="#6a0202"
        display="inline-block"
        p="5px 10px"
        borderRadius="10px"
        fontWeight="bold"
        fontSize="1.2rem"
      >
        Bio
      </Heading>
      <Text mt="10px" fontWeight="400" lineHeight="1.4">
        You don’t have anything in your bio. Go to account and edit profile to
        add something cool about yourself.
      </Text>
      <Text mt="20px" fontWeight="bold" fontSize="0.9rem">
        Joined Sep 24, 2024
      </Text>
    </Box>
  );
};

export default BioSection;

