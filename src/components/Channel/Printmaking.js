import {
	Box,
	Flex,
	Text,
	Button,
	VStack,
	HStack,
	Avatar,
} from "@chakra-ui/react";
import Sidebar from "../Navbar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Post from "../Post/Post";
import EventsSection from "../EventsSection/EventsSection";

const Printmaking = ({ userData }) => {
	const navigate = useNavigate();

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// Fetch posts from the backend
		const fetchPosts = async () => {
			try {
				const response = await fetch("http://localhost:8080/printmaking");
				const data = await response.json();
				setPosts(data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchPosts();
	}, []);

	// for updating and deleting the post section
	const handleDelete = (postId) => {
		setPosts((prevPosts) => prevPosts.filter((post) => post.post_id !== postId));
	};
	
	// update post
	const handleUpdate = (postId, title, content) => {
		setPosts((prevPosts) =>
		  prevPosts.map((post) =>
			post.post_id === postId ? { ...post, title, content } : post
		  )
		);
	};
	

	return (
    <Flex height="100vh">
      <Sidebar userType={userData.user_type} />
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
              <img
                src="/images/community-icon.png"
                width="75"
                alt="Community Icon"
              />
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
            <Button
              w="full"
              colorScheme="orange"
              variant="outline"
              onClick={() => navigate("/post")}
            >
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
            {/* Render posts */}
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post
                  key={post.post_id}
                  post={post}
                  userId={userData.user_id}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                /> // pass the props the post component
              ))
            ) : (
              <Text>No posts available yet</Text>
            )}
          </Box>

          {/* Upcoming Events */}
          <EventsSection />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Printmaking;
