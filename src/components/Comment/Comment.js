import { 
  Box, 
  Text, 
  Button, 
  HStack, 
  Avatar,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  Textarea,
  MenuItem,
  useDisclosure,
  useToast} 
from "@chakra-ui/react";
import { FiMoreHorizontal } from 'react-icons/fi'; 
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import CommentForm from './CommentForm'; 
import ReportForm from '../Post/ReportForm';
import LikeList from '../Like/LikeList';

const Comment = ({ comment, userId, post_id, onCommentSubmit, onUpdate }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showReplies, setShowReplies] = useState(false);  // toggle replies
  const [replies, setReplies] = useState(comment.replies || []);
  const [showReplyForm, setShowReplyForm] = useState(false); // toggle reply form

  // for showing the like: 
  const [likeCount, setLikeCount] = useState(comment.like_count || 0);
  const [likedByUsers, setLikedByUsers] = useState([]);  // Initialize as empty array
  const [isLikeModalOpen, setLikeModalOpen] = useState(false);

  //fetch the like
  const fetchLikes = useCallback(async () => {
    const response = await fetch(`http://localhost:8080/api/commentLikes/${comment.comment_id}`);
    if (response.ok) {
      const data = await response.json();
      setLikeCount(data.like_count);
      setLikedByUsers(data.liked_by_users || []); // Ensure this is always an array
    }
  }, [comment.comment_id]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const handleLikeComment = async () => {
    const response = await fetch(`http://localhost:8080/api/likeComment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment_id: comment.comment_id, user_id: userId }),
    });

    if (response.ok) {
      await fetchLikes(); // Refresh the like count and liked users after a like action
    } else {
      console.error("Failed to like comment");
    }
  };

  const handleUnlikeComment = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/unlikeComment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment_id: comment.comment_id, user_id: userId }),
      });

      if (response.ok) {
        await fetchLikes(); // Refresh likes after the action
      } else {
        console.error("Failed to unlike comment");
      }
    } catch (err) {
      console.error("Error unliking comment:", err);
    }
  };

	const handleLikeToggle = async () => {
		if (likedByUsers.some(user => user.user_id === userId)) {
			await handleUnlikeComment();
		} else {
			await handleLikeComment();
		}
	};

  // showing the report form
  const { isOpen, onOpen, onClose } = useDisclosure();

  // for edit comment
  const [isEditing, setIsEditing] = useState(false); // toggle edit mode
  const [editedContent, setEditedContent] = useState(comment.content); // track  edited content

  // check if there are replies
  const hasReplies = comment.replies && comment.replies.length > 0;

  useEffect(() => {
    setReplies(comment.replies || []);
  }, [comment.replies]);

  // fix so that it updates the new reply 
  const handleNewReply = (newReply) => {
    setReplies((prevReplies) => [...prevReplies, newReply]);
    onCommentSubmit(newReply);
    setShowReplyForm(false);
  };
  
  // toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // save the comment edited
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/comment/${comment.comment_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editedContent, userId: userId }),
      });
      if (response.ok) {
        setIsEditing(false);
        onUpdate(comment.comment_id, editedContent); 

        toast({
          title: "Comment updated.",
          description: "Your comment has been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error('Failed to update comment');
      }
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  // go to user profile
	const goToUserProfile = (user_id) => {
		if (userId === comment.user_id) {
		  navigate("/profile"); // Redirect to logged-in user's profile
		} else {
		  navigate(`/profile/${user_id}`); // Redirect to other user's profile
		}
	};

  return (
    <Box bg="gray.100" p="4" rounded="md" mb="4" position="relative">
      {/* Menu for Edit and Report */}
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
          {userId === comment.user_id ? (
            // Show "Edit" option for the owner of the comment
            <MenuItem onClick={handleEditToggle}>Edit</MenuItem>
          ) : (
            // Show "Report" option for other users
            <MenuItem onClick={onOpen}>Report</MenuItem>
          )}
        </MenuList>
      </Menu>

      <ReportForm
        isOpen={isOpen}
        onClose={onClose}
        commentId={comment.comment_id}
        reportedBy={userId}
      />



      {/* Comment Header */}
      <HStack align="center" mb="4">
        <Avatar 
          size="sm" 
          src={
						comment.profile_picture
							? `${process.env.PUBLIC_URL}/images/profile_pictures/${comment.profile_picture}`
							: undefined
					}
					cursor="pointer"
					_hover={{ boxShadow: "lg" }}
          onClick={() => goToUserProfile(comment.user_id)}
        
        />
        <Text 
          fontWeight="bold"
          cursor="pointer"
          _hover={{ boxShadow: "lg" }}
          onClick={() => goToUserProfile(comment.user_id)}
        >
          {comment.username}
        </Text> {/* Display username */}
        <Text fontSize="sm" color="gray.500">
          {new Date(comment.updated_at).toLocaleDateString()}
        </Text>
      </HStack>

       {/* Comment Content - Edit Mode or View Mode */}
       {isEditing ? (
        <>
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Edit your comment"
            mb="4"
          />
          <HStack spacing="4">
            <Button colorScheme="blue" size="sm" onClick={handleSaveEdit}>Save</Button>
            <Button variant="ghost" size="sm" onClick={handleEditToggle}>Cancel</Button>
          </HStack>
        </>
      ) : (
        <Text mb="4">{comment.content}</Text>
      )}


      {/* Like/Reply Buttons */}
      <HStack>
        <Button size="sm" variant="ghost" onClick={handleLikeToggle}>
						{likedByUsers.some(user => user.user_id === userId) ? "💔" : "❤️"} {likeCount}
					</Button>
        <Button size="sm" variant="ghost" onClick={() => setLikeModalOpen(true)}>View Likes</Button>
        <Button size="sm" variant="ghost" onClick={() => setShowReplyForm(!showReplyForm)}>
          Reply
        </Button>
        {hasReplies && (
          <Button size="sm" variant="ghost" onClick={() => setShowReplies(!showReplies)}>
            {showReplies ? "Hide Replies" : `Show Replies (${comment.replies.length})`}
          </Button>
        )}
      </HStack>

      {/* Reply Form */}
      {showReplyForm && (
        <Box mt="4" pl="8">
          <CommentForm
            post_id={post_id}  
            userId={userId}    
            parent_id={comment.comment_id}  
            onCommentSubmit={handleNewReply}  // updates the replies on successful submission (?)
          />
        </Box>
      )}

      {/* Render Replies */}
      {showReplies && hasReplies && (
        <Box pl="8" mt="4">
          {replies.map(reply => (
            <Comment key={reply.comment_id} comment={reply} post_id={post_id} userId={userId} onCommentSubmit={onCommentSubmit} onUpdate={onUpdate} />  
          ))}
        </Box>
      )}

       {/* LikeList Modal for Comment */}
       <LikeList
        isOpen={isLikeModalOpen}
        onClose={() => setLikeModalOpen(false)}
        likedByUsers={likedByUsers} 
        userId={userId}
      />
    </Box>
  );

};

export default Comment;