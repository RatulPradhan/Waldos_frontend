import {
	Box,
	Button,
	Input,
	Textarea,
	FormControl,
	FormLabel,
	Select,
	VStack,
	HStack,
	Avatar,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostForm = ({ userId, username, profile_picture }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [channelId, setChannelId] = useState(1); // Default to General channel (channel_id = 1)
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const postData = {
			user_id: userId,
			channel_id: channelId,
			// user_name: username,
			title,
			content,
		};

		try {
			const response = await fetch("http://localhost:8080/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(postData),
			});

			if (response.ok) {
				navigate("/home");
			} else {
				console.error("Failed to create post");
			}
		} catch (error) {
			console.error("Error submitting post:", error);
		}
	};

	return (
		<Box
			p="6"
			rounded="md"
			maxW="600px"
			mx="auto"
			mt="8"
			backdropFilter="blur(5px)" // slight blur to the background
			bg="rgba(255, 255, 255, 0.8)" // white background with slight transparency
			shadow="lg"
		>
			<VStack spacing={4} align="stretch">
				<HStack mb="4">
					<Avatar
						size="md"
						src={
							profile_picture
								? `${process.env.PUBLIC_URL}/images/profile_pictures/${profile_picture}`
								: undefined
						}
					/>
					<Text fontWeight="bold">{username || "No Username Available"}</Text>
				</HStack>

				<form onSubmit={handleSubmit}>
					<FormControl id="channel" mb={4}>
						<FormLabel fontWeight="bold">Pick a community</FormLabel>
						<Select
							value={channelId}
							onChange={(e) => setChannelId(Number(e.target.value))}
							bg="white"
							size="lg"
						>
							<option value={1}>General</option>
							<option value={2}>Ceramics</option>
							<option value={3}>Printmaking</option>
							<option value={4}>Film Photography</option>
						</Select>
					</FormControl>

					<FormControl id="title" mb={4}>
						<FormLabel fontWeight="bold">Title</FormLabel>
						<Input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter the title of your post"
							size="lg"
							bg="white"
						/>
					</FormControl>

					<FormControl id="content" mb={4}>
						<FormLabel fontWeight="bold">
							Share something with the community
						</FormLabel>
						<Textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Write your post here"
							size="lg"
							bg="white"
						/>
					</FormControl>

					<Button type="submit" colorScheme="blue" size="lg" w="full">
						Submit Post
					</Button>
				</form>
			</VStack>
		</Box>
	);
};

export default PostForm;
