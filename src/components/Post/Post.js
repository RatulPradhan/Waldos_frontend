import { Box, Text, HStack, Button, Avatar } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
  // random like for now
  const navigate = useNavigate(); 

  const randomLikes = Math.floor(Math.random() * 100);

  const goToPostDetails = () => {
    navigate(`/post/${post.post_id}`);  
  };

  return (
    <Box bg="gray.100" p="4" rounded="md" mb="4">
      {/* Post Header */}
      <HStack align="center" mb="4">
        <Avatar size="md" />
        <Text fontWeight="bold">{post.username}</Text> 
      </HStack>

      {/* Post Title and Content */}
      <Text fontSize="2xl" fontWeight="bold" mb="2">{post.title}</Text>
      <Text mb="4">{post.content}</Text>

      {/* Likes and Comments */}
      <HStack justify="space-between">
        <HStack>
          <Button size="sm" variant="ghost">❤️ {randomLikes}</Button>
          <Button size="sm" variant="ghost" onClick={goToPostDetails}>💬 {post.comment_count || 0}</Button>
        </HStack>
        <Text fontSize="sm" color="gray.500">
          {new Date(post.created_at).toLocaleDateString()}
        </Text>
      </HStack>
    </Box>
  );
};

export default Post;
