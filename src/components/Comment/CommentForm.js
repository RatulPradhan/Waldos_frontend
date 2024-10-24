import { useState } from "react";
import { Box, Textarea, Button } from "@chakra-ui/react";

const CommentForm = ({ post_id, userId, parent_id = null, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText) return;

    try {
      const response = await fetch(`http://localhost:8080/posts/${post_id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id,
          user_id: userId,
          content: commentText,
          parent_id, 
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        onCommentSubmit(newComment); // update the comments list
        setCommentText(""); // clear the input
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <Box>
      <Textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder={parent_id ? "Write your reply" : "What are your thoughts?"} 
      />
      <Button mt="2" onClick={handleSubmit} colorScheme="blue">
        {parent_id ? "Submit Reply" : "Submit Comment"} 
      </Button>
    </Box>
  );
};

export default CommentForm;

