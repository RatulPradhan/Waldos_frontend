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
import Sidebar from "../Navbar/Sidebar";
import Post from "../Post/Post";

const UserProfilePage = () => {
	const { user_id } = useParams();
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch user data based on user_id
		fetch(`http://localhost:8080/user/id/${user_id}`)
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
	}, [user_id]);

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
		<Flex height="100vh">
			{/* Sidebar */}
			<Sidebar userType={userData.userRole} />

			<Box flex="1" p="5" height="100%" overflowY="auto">
				{/* Profile Section */}
				<Box bg="#F6DEB5" mb="4" rounded="md" height="300px">
					<Box
						p="6"
						mb="3"
						rounded="md"
						bgImage="/images/wallpaper2.jpg"
						bgSize="cover"
						bgPos="top"
						height="175px"
					/>
					<Box padding="0px 25px">
						<Flex align="center">
							<Avatar
								size="xl"
								src={
									userData.profile_picture
										? `${process.env.PUBLIC_URL}/images/profile_pictures/${userData.profile_picture}`
										: undefined
								}
								alt="Profile Avatar"
							/>
							<Text fontSize="3xl" fontWeight="bold" ml="4">
								{userData.username}
							</Text>
						</Flex>
					</Box>
				</Box>

				<Flex>
					{/* Bio Section */}
					<Box flex="2" mr="5">
						<Box
							bg="#F6DEB5"
							p="10px"
							borderRadius="10%"
							color="#6a0202"
							fontFamily="'Petrona', serif"
							fontSize="1rem"
							w="100%"
						>
							<Heading
								as="h4"
								bg="#dd907a"
								color="#6a0202"
								display="inline-block"
								p="5px 10px"
								borderRadius="10px"
								fontWeight="bold"
								fontSize="1.2rem"
							>
								Bio
							</Heading>
							<Text mt="10px" fontWeight="400" lineHeight="1.4">
								{userData.bio || "No bio available"}
							</Text>
							<Text mt="20px" fontWeight="bold" fontSize="0.9rem">
								Joined{" "}
								<Text as="span" fontStyle="italic">
									{new Date(userData.created_at).toLocaleDateString("en-US", {
										day: "numeric",
										month: "long",
										year: "numeric",
									})}
								</Text>
							</Text>
						</Box>
					</Box>

					{/* Posts Section */}
					<Box
						w="80%"
						bg="#E1CBAA"
						borderRadius="md"
						boxShadow="md"
						p={4}
						border="1px"
						borderColor="#d69b75"
					>
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
					</Box>
				</Flex>
			</Box>
		</Flex>
	);
};

export default UserProfilePage;
