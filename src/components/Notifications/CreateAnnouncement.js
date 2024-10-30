import { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Text } from "@chakra-ui/react";

const CreateAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/announcement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Announcement created:", data);
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  return (
    <Box
      bg="#E1CBAA"
      p={4}
      borderRadius="md"
      boxShadow="md"
      border="1px"
      borderColor="#d69b75"
      mt={6}
    >
      <Text fontSize="1.2rem" color="#6a0202" mb={4}>
        Create New Announcement
      </Text>
      <VStack spacing={3} align="stretch">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          borderColor="black"
          focusBorderColor="#d69b75"
		  bg='white'
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
		  borderColor="black"
          focusBorderColor="#d69b75"
          resize="vertical"
		  bg='white'
        />
        <Button colorScheme="teal" onClick={handleSubmit}>
          Create Announcement
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateAnnouncement;
