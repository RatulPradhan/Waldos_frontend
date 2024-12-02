import React, { useState, useEffect } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import ProfileSection from "../Profile/ProfileSection";
import BioSection from "../Profile/BioSection";
import PostsSection from "../Profile/PostsSection";
import Sidebar from "../Navbar/Sidebar";
// import CreateAnnouncement from "../Notifications/CreateAnnouncement";

import Post from "../Post/Post";

const ProfilePage = () => {
	const [userData, setUserData] = useState(() => {
		return JSON.parse(window.localStorage.getItem("userData"));
	});

	const updateUserData = (newData) => {
		setUserData(newData);
		window.localStorage.setItem("userData", JSON.stringify(newData));
	};

	useEffect(() => {
		console.log("ProfilePage - userData:", userData);
	}, [userData]);

	return (
		<Flex height="100vh">
			<Sidebar userType={userData.user_type} />
			<Box flex="1" p="5" height="100%" overflowY="auto">
				<ProfileSection
					profile_picture={userData.profile_picture}
					user_id={userData.user_id}
					updateUserData={updateUserData} // Pass the callback
				/>
				<Flex>
					<Box flex="2" mr="5">
						<BioSection user_id={userData.user_id} />
					</Box>
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
							<Box flex="1">
								<PostsSection
									posts={userData.posts}
									userId={userData.user_id}
									userRole={userData.userRole}
								/>
							</Box>
						</VStack>
					</Box>
				</Flex>
			</Box>
		</Flex>
	);
};

export default ProfilePage;
