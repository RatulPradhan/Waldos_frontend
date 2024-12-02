import {
	Box,
	Text,
	HStack,
	Button,
	Avatar,
	Input,
	Textarea,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi"; // Import the icon for the menu button
import React, { useState, useEffect, useCallback } from "react"; // Import useState from React
import { useNavigate } from "react-router-dom";
import ReportForm from "./ReportForm";
import LikeList from "../Like/LikeList";

const Post = ({
	post,
	userId,
	onDelete,
	onUpdate,
	userRole,
	profile_picture,
}) => {
	
	const navigate = useNavigate();
	const toast = useToast(); 

	// like related things
	const [likeCount, setLikeCount] = useState(post.like_count || 0);
	const [likedByUsers, setLikedByUsers] = useState([]); // Initialize as empty array
	const [isLikeModalOpen, setLikeModalOpen] = useState(false);

	// Fetch the like count and liked users when the component mounts
	const fetchLikes = useCallback(async () => {
		const response = await fetch(
			`http://localhost:8080/api/postLikes/${post.post_id}`
		);
		if (response.ok) {
			const data = await response.json();
			setLikeCount(data.like_count);
			setLikedByUsers(data.liked_by_users || []); // Ensure this is always an array
		}
	}, [post.post_id]);

	useEffect(() => {
		fetchLikes();
	}, [fetchLikes]);

	const handleLikePost = async () => {
		const response = await fetch(`http://localhost:8080/api/likePost`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ post_id: post.post_id, user_id: userId }),
		});

		if (response.ok) {
			await fetchLikes(); // Refresh the like count and liked users after a like action
		} else {
			console.error("Failed to like post");
		}
	};

	const handleUnlikePost = async () => {
		const response = await fetch(`http://localhost:8080/api/unlikePost`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ post_id: post.post_id, user_id: userId }),
		});
	
		if (response.ok) {
			await fetchLikes(); // Refresh the like count and liked users
		} else {
			console.error("Failed to unlike post");
		}
	};

	const handleLikeToggle = async () => {
		if (likedByUsers.some(user => user.user_id === userId)) {
			await handleUnlikePost();
		} else {
			await handleLikePost();
		}
	};

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
			const response = await fetch(
				`http://localhost:8080/posts/${post.post_id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ title, content, userId: userId }),
				}
			);
			if (response.ok) {
				setIsEditing(false);
				onUpdate(post.post_id, title, content);
				toast({
				  title: "Post updated.",
				  description: "Your post has been updated successfully.",
				  status: "success",
				  duration: 3000,
				  isClosable: true,
				});
			} else {
				console.error("Failed to update post");
			}
		} catch (err) {
			console.error("Error updating post:", err);
		}
	};

	// delete post
	const handleDelete = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/posts/${post.post_id}`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ userId: userId }),
				}
			);
			if (response.ok) {
				onDelete(post.post_id);
        		toast({
          			title: "Post deleted.",
          			description: "Your post has been deleted successfully.",
          			status: "success",
          			duration: 3000,
          			isClosable: true,
        		});
        		navigate("/home");
			} else {
				console.error("Failed to delete post");
			}
		} catch (err) {
			console.error("Error deleting post:", err);
		}
	};

	//update report form
	const { isOpen, onOpen, onClose } = useDisclosure();

	// go to user profile
	const goToUserProfile = (user_id) => {
		if (userId === user_id) {
		  navigate("/profile"); // Redirect to logged-in user's profile
		} else {
		  navigate(`/profile/${user_id}`); // Redirect to other user's profile
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
					{(userId === post.user_id || userRole === "admin") && (
						<MenuItem onClick={handleDelete} color="red.500">
							Delete
						</MenuItem>
					)}
					{userId === post.user_id && (
						<MenuItem onClick={() => setIsEditing(true)}>Edit</MenuItem>
					)}
					{userId !== post.user_id && userRole !== "admin" && (
						<MenuItem onClick={onOpen}>Report</MenuItem>
					)}
				</MenuList>
			</Menu>

			<ReportForm
				isOpen={isOpen}
				onClose={onClose}
				postId={post.post_id}
				reportedBy={userId}
			/>

			{/* Post Header */}
			<HStack align="center" mb="4">
				{/* <Link to={`/user/${post.user_id}/bio`}>  */}
				<Avatar
					size="md"
					src={
						post.profile_picture
							? `${process.env.PUBLIC_URL}/images/profile_pictures/${post.profile_picture}`
							: undefined
					}
					cursor="pointer"
					_hover={{ boxShadow: "lg" }}
					onClick={() => goToUserProfile(post.user_id)}
				/> 
				{/* </Link> */}
				<Text 
					fontWeight="bold"
					cursor="pointer"
					_hover={{ boxShadow: "lg" }}
					onClick={() => goToUserProfile(post.user_id)}
				>
					{post.username}
				</Text>
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
					<Text fontSize="2xl" fontWeight="bold" mb="2">
						{post.title}
					</Text>
					<Text mb="4" whiteSpace="pre-wrap" >{post.content}</Text> 
				</>
			)}

			{/* Likes and Comments */}
			<HStack justify="space-between">
				<HStack>
					{/* Like Button - Opens LikeList on count click */}
					<Button size="sm" variant="ghost" onClick={handleLikeToggle}>
						{likedByUsers.some(user => user.user_id === userId) ? "💔" : "❤️"} {likeCount}
					</Button>
					<Button
						size="sm"
						variant="ghost"
						onClick={() => setLikeModalOpen(true)}
					>
						View Likes
					</Button>
					<Button size="sm" variant="ghost" onClick={goToPostDetails}>
						💬 {post.comment_count || 0}
					</Button>
				</HStack>
				<Text fontSize="sm" color="gray.500">
					{new Date(post.updated_at).toLocaleDateString()}
				</Text>
			</HStack>

			{/* LikeList Modal */}
			<LikeList
				isOpen={isLikeModalOpen}
				onClose={() => setLikeModalOpen(false)}
				likedByUsers={likedByUsers} 
				userId={userId}
			/>

			{/* Save and Cancel buttons for Edit Mode */}
			{isEditing && (
				<HStack mt="4" spacing="4">
					<Button colorScheme="blue" size="sm" onClick={handleSave}>
						Save
					</Button>
					<Button variant="ghost" size="sm" onClick={handleEditToggle}>
						Cancel
					</Button>
				</HStack>
			)}
		</Box>
	);
};

export default Post;
