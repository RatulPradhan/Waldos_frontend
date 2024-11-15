import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, VStack, Flex, Heading, Divider, Text } from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import Post from "./Post";
import CommentForm from "../Comment/CommentForm";
import Sidebar from "../Navbar/Sidebar";

const PostDetails = ({ userId }) => {
  const { post_id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const fetchPostWithComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/posts/${post_id}/comments`
        );
        const data = await response.json();
        setPost(data.post);
        setComments(data.comments || []);
      } catch (error) {
        console.error("Error fetching post with comments:", error);
      }
    };

    fetchPostWithComments();
  }, [post_id]);

  const handleNewComment = (newComment) => {
    setComments([...comments, newComment]);
    setTotalComments(totalComments + 1);
  };

  return (
    <Flex justify="center" mt={4}>
      <Box
        width={{ base: "90%", md: "80%", lg: "70%" }}
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="lg"
      >
        {post && (
          <Box mb={6}>
            <Heading as="h2" size="xl" mb={4} color="gray.800">
              Post Details
            </Heading>
            <Post post={post} />
            <Divider my={6} borderColor="gray.300" />
          </Box>
        )}

        <Heading as="h3" size="lg" mb={4} color="gray.700">
          Comments ({comments.length})
        </Heading>
        <CommentForm
          post_id={post_id}
          userId={userId}
          onCommentSubmit={handleNewComment}
        />

        <VStack
          align="stretch"
          spacing={4}
          mt={4}
          overflowY="auto"
          maxH="500px"
        >
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment.comment_id}
                comment={comment}
                post_id={post_id}
                userId={userId}
              />
            ))
          ) : (
            <Text color="gray.500" textAlign="center">
              No comments yet. Be the first to comment!
            </Text>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default PostDetails;
