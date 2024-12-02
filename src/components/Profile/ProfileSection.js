import {
	Box,
	Flex,
	Text,
	Button,
	VStack,
	HStack,
	Avatar,
	Tooltip,
	useToast,
} from "@chakra-ui/react";
import "../../styles/ProfileSection.css";
import React, { useState, useEffect } from "react";

const ProfileSection = ({ profile_picture, user_id, updateUserData }) => {
	const defaultProfilePic = "/images/profile_pictures/avatar.jpg";
	const [profilePic, setProfilePic] = useState(defaultProfilePic);
	const [isHovered, setIsHovered] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [username, setUsername] = useState(
		JSON.parse(window.localStorage.getItem("userData")).username
	);
	const [newUsername, setNewUsername] = useState(username);
	const toast = useToast();

	useEffect(() => {
		if (profile_picture) {
			const profile_pic_path = "/images/profile_pictures/" + profile_picture;
			setProfilePic(profile_pic_path);
		} else {
			setProfilePic(defaultProfilePic);
		}
	}, [profile_picture]);

	useEffect(() => {
		const userData = JSON.parse(window.localStorage.getItem("userData"));
		if (userData && userData.username !== username) {
			setUsername(userData.username);
		}
	}, [username]);

	const handleProfilePicChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = async () => {
				setProfilePic(reader.result);

				const formData = new FormData();
				formData.append("profile_picture", file);
				const userData = JSON.parse(window.localStorage.getItem("userData"));
				const userId = userData.user_id;
				const fileExtension = file.name.split(".").pop();
				const fileName = `${userId}.${fileExtension}`;
				formData.append("user_id", userId);
				formData.append("file_name", fileName);

				try {
					const response = await fetch(
						"http://localhost:8080/upload_profile_picture",
						{
							method: "POST",
							body: formData,
						}
					);
					if (!response.ok) {
						throw new Error("Failed to upload profile picture");
					}
					const data = await response.json();
					console.log("Profile picture uploaded successfully:", data);

					// Update userData in localStorage
					userData.profile_picture = fileName;
					window.localStorage.setItem("userData", JSON.stringify(userData));
					
					// Update parent component's userData
					updateUserData(userData);

					// Optionally, force a re-fetch or update the parent component
					// You might need to call a prop function to notify the parent
					updateUserData(userData);
				} catch (error) {
					console.error("Error uploading profile picture:", error);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleUsernameChange = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/user/${user_id}/username`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username: newUsername }),
				}
			);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message);
			}
			const data = await response.json();
			toast({
				title: "Username updated successfully.",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			const userData = JSON.parse(window.localStorage.getItem("userData"));
			userData.username = newUsername;
			window.localStorage.setItem("userData", JSON.stringify(userData)); // Update local storage
			setUsername(newUsername); // Update the username state
			setIsEditing(false);
		} catch (error) {
			toast({
				title: "Username may be taken.",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
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
				<HStack>
					<input
						type="file"
						accept="image/*"
						style={{ display: "none" }}
						id="profilePicInput"
						onChange={handleProfilePicChange}
					/>
					<Box
						position="relative"
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						onClick={() => document.getElementById("profilePicInput").click()}
					>
						<img src={profilePic} width="300" className="profile-avatar" />
						{isHovered && (
							<Box
								position="absolute"
								top="0"
								left="0"
								width="100%"
								height="100%"
								bg="rgba(0, 0, 0, 0.3)" // Lower transparency
								color="white"
								display="flex"
								alignItems="center"
								justifyContent="center"
								fontSize="xs" // Smaller font
								fontWeight="bold"
								fontFamily="Raleway, sans-serif" // Change font to Raleway
								textAlign="center" // Centered text
							>
								Click to change profile picture
							</Box>
						)}
					</Box>
					<Box>
						{isEditing ? (
							<HStack>
								<input
									type="text"
									value={newUsername}
									onChange={(e) => setNewUsername(e.target.value)}
								/>
								<Button size="sm" onClick={handleUsernameChange}>
									Save
								</Button>
								<Button size="sm" onClick={() => setIsEditing(false)}>
									Cancel
								</Button>
							</HStack>
						) : (
							<HStack>
								<Text fontSize="3xl" fontWeight="bold">
									{username}
								</Text>
								<Button size="sm" onClick={() => setIsEditing(true)}>
									Edit
								</Button>
							</HStack>
						)}
					</Box>
				</HStack>
			</Box>
		</Box>
	);
};

export default ProfileSection;
