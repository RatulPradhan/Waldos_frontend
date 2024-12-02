// src/components/Profile/PostsSection.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Flex,
	Text,
	VStack,
	Spinner,
	Avatar,
	Heading,
} from "@chakra-ui/react";
import Post from "../Post/Post";

const PostsSection = ({ posts, userId, userRole }) => {
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

	if (!userData) {
		return (
			<Flex justify="center" align="center" height="100vh">
				<Text fontSize="xl" color="red.500">
					User not found.
				</Text>
			</Flex>
		);
	}

	return (
		<VStack spacing={4} align="stretch">
			<Box mb={4}>
				<Text fontSize="1.2rem" color="#6a0202" textAlign="left">
					Posts ({userData.posts?.length || 0})
				</Text>
			</Box>
			<Box flex="1">
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
			</Box>
		</VStack>
	);
};

export default PostsSection;
