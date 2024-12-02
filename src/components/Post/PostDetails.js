import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import Post from "./Post";
import CommentForm from "../Comment/CommentForm";

const PostDetails = ({ userId }) => {
	const { post_id } = useParams();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);

	const handleCommentUpdate = (commentId, newContent) => {
		setComments((prevComments) => {
			const updateContent = (commentsList) => {
				return commentsList.map((comment) => {
					if (comment.comment_id === commentId) {
						return { ...comment, content: newContent };
					} else if (comment.replies) {
						return { ...comment, replies: updateContent(comment.replies) };
					}
					return comment;
				});
			};
			return updateContent(prevComments);
		});
	};

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

	// update comments when a new one is submitted (?)
	// const handleNewComment = (newComment) => {
	//   setComments([...comments, newComment]);
	//   setTotalComments(totalComments + 1);
	// };

	// fix it so that i update the reply section as well
	// update comments when a new one is submitted
	const handleNewComment = (newComment) => {
		// Helper function to recursively find the correct parent and add the reply
		const addReplyToComment = (commentsList) => {
			return commentsList.map((comment) => {
				// Check if this is the correct parent
				if (comment.comment_id === newComment.parent_id) {
					return {
						...comment,
						replies: [...(comment.replies || []), newComment],
					};
				}
				// If not, check if this comment has replies and recurse
				else if (comment.replies) {
					return {
						...comment,
						replies: addReplyToComment(comment.replies),
					};
				}
				return comment;
			});
		};


		// Check if it's a reply or a top-level comment
		if (newComment.parent_id) {
			// Update nested replies
			setComments((prevComments) => addReplyToComment(prevComments));
		} else {
			// Add as a new top-level comment
			setComments((prevComments) => [...prevComments, newComment]);
		}
	};

	return (
		<Box p="5">
			{post && <Post post={post} />}

			<CommentForm
				post_id={post_id}
				userId={userId}
				onCommentSubmit={handleNewComment}
			/>


			{/* Comments section */}
			<VStack align="stretch" spacing={4}>
				{comments.map((comment) => (
					<Comment
						key={comment.comment_id}
						comment={comment}
						post_id={post_id}
						userId={userId}
						onCommentSubmit={handleNewComment}
						onUpdate={handleCommentUpdate}
					/>
				))}
			</VStack>
		</Box>
	);
};

export default PostDetails;
