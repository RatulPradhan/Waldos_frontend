import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import ProfileSection from "../Profile/ProfileSection";
import BioSection from "../Profile/BioSection";
import PostsSection from "../Profile/PostsSection";
import Sidebar from "../Navbar/Sidebar";
// import CreateAnnouncement from "../Notifications/CreateAnnouncement";

const ProfilePage = ({ userData }) => {
	const isAdmin =
		JSON.parse(window.localStorage.getItem("userData")).user_type === "admin";
	return (
		<Flex height="100vh">
			<Sidebar userType={userData.user_type} />
			<Box flex="1" p="5" height="100%" overflowY="auto">
				<ProfileSection profile_picture={userData.profile_picture} user_id= {userData.user_id} />
				<Flex>
					<Box flex="2" mr="5">
						<BioSection userData />
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
                        <PostsSection userId={userData.user_id} />
                    </Box>
				</Flex>
			</Box>
		</Flex>
	);
};

export default ProfilePage;
