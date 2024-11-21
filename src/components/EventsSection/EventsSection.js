import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/ongoing_upcoming_events"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();

        // Sort events by date, most recent first
        const sortedEvents = data.sort(
          (a, b) => new Date(a.event_at) - new Date(b.event_at)
        );

        setEvents(sortedEvents);
      } catch (error) {
        setError("Error fetching events: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <Spinner size="xl" color="orange.400" />;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
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
              as="a"
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              key={event.id}
              textAlign="center"
              w="full"
              bg={event.status === "ongoing" ? "green.400" : "orange.400"}
              color="white"
              p="3"
              rounded="md"
              _hover={{ opacity: 0.8, cursor: "pointer" }}
            >
              <Text fontWeight="bold" fontSize="2xl">
                {new Date(event.event_at).toLocaleDateString()}{" "}
                {new Date(event.event_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text>{event.name}</Text>
            </Box>
          ))
        ) : (
          <Box w="full" bg="orange.100" p="3" rounded="md">
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
