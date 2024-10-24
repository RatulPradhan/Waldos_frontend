import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, VStack } from "@chakra-ui/react";
import Comment from '../Comment/Comment';
import Post from './Post'; 
import CommentForm from '../Comment/CommentForm';

const PostDetails = ({ userId }) => {
  const { post_id } = useParams();  
  const [post, setPost] = useState(null);  
  const [comments, setComments] = useState([]);  
  const [totalComments, setTotalComments] = useState(0);  

  useEffect(() => {
    const fetchPostWithComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/${post_id}/comments`);
        const data = await response.json();
        setPost(data.post);  
        setComments(data.comments || []);
      } catch (error) {
        console.error("Error fetching post with comments:", error);
      }
    };

    fetchPostWithComments();
  }, [post_id]);

   // update comments when a new one is submitted (?)
   const handleNewComment = (newComment) => {
    setComments([...comments, newComment]);
    setTotalComments(totalComments + 1); 
  };

  return (
    <Box p="5">
      {post && (
        <Post post={post} />
      )}

       <CommentForm post_id={post_id} userId={userId} onCommentSubmit={handleNewComment} />

      {/* Comments section */}
      <VStack align="stretch" spacing={4}>
        {comments.map(comment => (
          <Comment key={comment.comment_id} comment={comment} post_id={post_id} userId={userId} />
        ))}
      </VStack>
    </Box>
  );
};

export default PostDetails;


