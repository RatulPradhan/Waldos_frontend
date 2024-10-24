import { Box, Text, Button, HStack, Avatar } from "@chakra-ui/react";
import { useState } from 'react';
import CommentForm from './CommentForm'; 

const Comment = ({ comment, userId, post_id }) => {
  const [showReplies, setShowReplies] = useState(false);  // toggle replies
  const [replies, setReplies] = useState(comment.replies || []);
  const [showReplyForm, setShowReplyForm] = useState(false); // toggle reply form

  // check if there are replies
  const hasReplies = comment.replies && comment.replies.length > 0;

  //handle new reply submission
  const handleNewReply = (newReply) => {
    // Properly update the replies
    setReplies((prevReplies) => [...prevReplies, newReply]);
    setShowReplyForm(false); // Hide the form after reply is submitted
  };

  return (
    <Box bg="gray.100" p="4" rounded="md" mb="4">
      {/* Comment Header */}
      <HStack align="center" mb="4">
        <Avatar size="sm" />
        <Text fontWeight="bold">{comment.username}</Text> {/* Display username */}
        <Text fontSize="sm" color="gray.500">
          {new Date(comment.created_at).toLocaleDateString()}
        </Text>
      </HStack>

      {/* Comment Content */}
      <Text mb="4">{comment.content}</Text>

      {/* Like/Reply Buttons */}
      <HStack>
        <Button size="sm" variant="ghost">❤️ {Math.floor(Math.random() * 50)}</Button>
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
            <Comment key={reply.comment_id} comment={reply} post_id={post_id} userId={userId} />  
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Comment;
