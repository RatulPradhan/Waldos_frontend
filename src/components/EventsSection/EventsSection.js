// EventsSection.js
import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch upcoming events from the backend
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/ongoing_upcoming_events"); // Updated endpoint for fetching events
        if (!response.ok) {
          // Check if the response is successful (status code 200)
          throw new Error("Failed to fetch events");
        }
        const data = await response.json(); // Parse the JSON response
        setEvents(data); // Set the events in the state
      } catch (error) {
        setError("Error fetching events: " + error.message); // Handle errors
      } finally {
        setLoading(false); // Stop the loading spinner once done
      }
    };

    fetchEvents(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures it runs only once

  if (loading) {
    return <Spinner size="xl" color="orange.400" />;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>; // Display error message
  }

  return (
    <Box w="30%" bg="#F6DEB5" shadow="sm" rounded="md" p="4">
      <Text fontWeight="bold" mb="4">
        Upcoming Events
      </Text>
      <VStack align="start" spacing="4">
        {events.length > 0 ? (
          events.map((event) => (
            <Box
              key={event.id} // Assuming each event has a unique 'id'
              textAlign="center"
              w="full"
              bg="orange.400"
              color="white"
              p="3"
              rounded="md"
            >
              <Text fontWeight="bold" fontSize="2xl">
                {new Date(event.event_at).toLocaleDateString()}{" "}
                {/* Format event date */}
              </Text>
              <Text>{event.name}</Text>
            </Box>
          ))
        ) : (
          <Box
            w="full"
            bg="orange.100" // Lighter shade to show the empty box
            p="3"
            rounded="md"
          >
            <Text textAlign="center" color="gray.500">
              No ongoing events
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default EventsSection;
