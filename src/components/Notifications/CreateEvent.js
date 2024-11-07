import {
  Box,
  VStack,
  Text,
  Input,
  Textarea,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const toast = useToast();

  const handleCreateEvent = () => {
    toast({
      title: "Feature under construction.",
      description: "Event creation functionality is not yet implemented.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
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
        Create a New Event
      </Text>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <Textarea
          placeholder="Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
        <HStack>
          <Input
            type="date"
            placeholder="Event Date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <Input
            type="time"
            placeholder="Event Time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </HStack>
        <Button colorScheme="teal" onClick={handleCreateEvent}>
          Create Event
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateEvent;
