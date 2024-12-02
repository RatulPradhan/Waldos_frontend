
import React, { useEffect, useState  } from "react";import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import Sidebar from "../Navbar/Sidebar";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
// import { NotificationContext } from "../Notifications/NotificationContext";

const Notifications = ({ userData }) => {
  // const { notifications, setNotifications, unreadCount } = useContext(NotificationContext); // Use unreadCount

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  
  //Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/notifications/${userData.user_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userData.user_id]);

  // Mark notification as read and navigate
  const handleNotificationClick = async (notif) => {
    try {
      // Mark the notification as read in the backend
      const response = await fetch(
        `http://localhost:8080/notifications/${notif.id}/read`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        // Update the local state to mark the notification as read
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notif.id ? { ...n, is_read: true } : n
          )
        );

        // Navigate to the related post
          navigate(`/post/${notif.post_id}`);
      } else {
        console.error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (loading) return <Text>Loading notifications...</Text>;

  return (
    <Flex height="100vh">
      {/* Sidebar on the left */}
      <Sidebar userType={userData.user_type} userId={userData.user_id} />

      {/* Main Content */}
      <Box flex="1" p="5" overflowY="auto">
        {/* Header Section */}
        <Box bg="#F6DEB5" mb="4" rounded="md" height="250px">
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
              <Text fontSize="3xl" fontWeight="bold">
                Notifications
              </Text>
            </HStack>
          </Box>
        </Box>

        {/* Notifications Section */}
        <Box bg="#F6DEB5" p="4" shadow="sm" rounded="md">
          <HStack justifyContent="space-between" mb="4">
            <Text fontWeight="bold">Your Notifications</Text>
            <IconButton icon={<FiBell />} aria-label="Notifications" />
          </HStack>

          {notifications.length === 0 ? (
            <Text>No notifications yet.</Text>
          ) : (
            <VStack spacing={4} align="stretch">
              {notifications.map((notif) => (
                <Box
                  key={notif.id}
                  p="4"
                  bg={notif.is_read ? "gray.200" : "blue.100"}
                  rounded="md"
                  shadow="sm"
                  onClick={() => handleNotificationClick(notif)}
                  cursor="pointer"
                >
                  <HStack justifyContent="space-between">
                    <Text>
                    {notif.sender_name} {renderNotificationMessage(notif.type)}
                    </Text>
                    {!notif.is_read && <Badge colorScheme="blue">New</Badge>}
                  </HStack>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(notif.created_at).toLocaleString()}
                  </Text>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

// Render notification message based on type
const renderNotificationMessage = (type) => {
  switch (type) {
    case "like_post":
      return "liked your post.";
    case "comment_post":
      return "commented on your post.";
    case "like_comment":
      return "liked your comment.";
    case "reply_comment":
      return "replied to your comment.";
    default:
      return "did something.";
  }
};

export default Notifications;
