import React, { useState, useEffect } from "react";
import { VStack, Flex, Text, Spinner } from "@chakra-ui/react";
import Post from "../Post/Post"; // Assuming this is the reusable Post component

const PostsSection = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data based on user_id
    fetch(`http://localhost:8080/user/id/${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch user data");
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      });
  }, [userId]);


  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="1.2rem" color="#6a0202" textAlign="left">
        Posts ({userData.posts?.length || 0})
      </Text>
      {userData.posts?.map((post) => (
                  <Post
                    key={post.post_id}
                    post={post}
                    userId={userData.user_id}
                    onDelete={() => console.log("Delete triggered")}
                    onUpdate={() => console.log("Update triggered")}
                    userRole={userData.userRole}
                    profile_picture={post.profile_picture}
                  />
      ))}
    </VStack>
  );
};

export default PostsSection;
