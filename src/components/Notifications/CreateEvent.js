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
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const toast = useToast();

  const handleCreateEvent = async () => {
    if (!eventName || !eventDate || !eventTime || !eventEndDate || !eventEndTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Combine event date and time into a single datetime string
    const eventDateTime = new Date(`${eventDate}T${eventTime}`);
    const eventEndDateTime = new Date(`${eventEndDate}T${eventEndTime}`);

    try {
      const response = await fetch("http://localhost:8080/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: eventName,
          description: eventDescription,
          event_at: eventDateTime.toISOString(), // Format as an ISO string
          event_end_at: eventEndDateTime.toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Event Created",
          description: `Event "${eventName}" was created successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Clear input fields after successful event creation
        setEventName("");
        setEventDescription("");
        setEventDate("");
        setEventTime("");
        setEventEndDate("");
        setEventEndTime("");
      } else {
        throw new Error(data.message || "Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
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
        <Text>Event Start</Text>
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
        <Text>Event End</Text>
        <HStack>
          <Input
            type="date"
            placeholder="Event End Date"
            value={eventEndDate}
            onChange={(e) => setEventEndDate(e.target.value)}
          />
          <Input
            type="time"
            placeholder="Event End Time"
            value={eventEndTime}
            onChange={(e) => setEventEndTime(e.target.value)}
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
