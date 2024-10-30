import { Box, Text, HStack, Button, Avatar, Input, Textarea, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"; 
import { FiMoreHorizontal } from 'react-icons/fi'; // Import the icon for the menu button
import React, { useState } from "react"; // Import useState from React
import { useNavigate } from 'react-router-dom';

const Post = ({ post, userId, onDelete, onUpdate  }) => {
  // random like for now
  const navigate = useNavigate(); 

  const randomLikes = Math.floor(Math.random() * 100);

  const goToPostDetails = () => {
    navigate(`/post/${post.post_id}`);  
  };

  // update post section
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  // toggle editing mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // save updated post
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/posts/${post.post_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, userId: userId }),
      });
      if (response.ok) {
        setIsEditing(false);
        onUpdate(post.post_id, title, content);
        alert('Post updated successfully');
      } else {
        console.error('Failed to update post');
      }
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  // delete post
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/posts/${post.post_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId }),
      });
      if (response.ok) {
        onDelete(post.post_id);
        alert('Post deleted successfully');
        navigate('/home'); 
      } else {
        console.error('Failed to delete post');
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };
    
  return (
    <Box bg="gray.100" p="4" rounded="md" mb="4" position="relative">
      
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FiMoreHorizontal />}
          variant="ghost"
          position="absolute"
          top="4"
          right="4"   
          aria-label="Options"
        />
        <MenuList>
          {userId === post.user_id ? (
            <>
              <MenuItem onClick={handleEditToggle}>Edit</MenuItem>
              <MenuItem onClick={handleDelete} color="red.500">Delete</MenuItem>
            </>
          ) : (
            <MenuItem>Report</MenuItem>
          )}
        </MenuList>
      </Menu>

      {/* Post Header */}
      <HStack align="center" mb="4">
        <Avatar size="md" />
        <Text fontWeight="bold">{post.username}</Text> 
      </HStack>
      
      
      {isEditing ? (
        <>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Edit Title"
            mb="2"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Edit Content"
            mb="4"
          />
        </>
      ) : (
        <>
          <Text fontSize="2xl" fontWeight="bold" mb="2">{post.title}</Text>
          <Text mb="4">{post.content}</Text>
        </>
      )}

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

      {/* Save and Cancel buttons for Edit Mode */}
      {isEditing && (
        <HStack mt="4" spacing="4">
          <Button colorScheme="blue" size="sm" onClick={handleSave}>Save</Button>
          <Button variant="ghost" size="sm" onClick={handleEditToggle}>Cancel</Button>
        </HStack>
      )}
      
    </Box>
  );
};

export default Post;
