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
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostForm = ({ userId, username, profile_picture }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [channelId, setChannelId] = useState(1); // Default to General channel (channel_id = 1)
	const [image, setImage] = useState(null);
	const navigate = useNavigate();
	const toast = useToast();

	// PostForm.js
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("user_id", userId);
		formData.append("channel_id", channelId);
		formData.append("title", title);
		formData.append("content", content);
		if (image) {
			formData.append("image", image);
		}

		// Log FormData contents
		for (let [key, value] of formData.entries()) {
			console.log(`${key}:`, value);
		}
		try {
			const response = await fetch("http://localhost:8080/posts", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				toast({
					title: "Post created.",
					description: "Your post has been successfully created.",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				const email = await fetch(
					"http://localhost:8080/send-following-emails",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ channelId, username, content }),
					}
				);
				navigate("/home");
			} else {
				toast({
					title: "Error.",
					description: "There was an error creating your post.",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		} catch (error) {
			console.error("Error submitting post:", error);
			toast({
				title: "Error.",
				description: "There was an error creating your post.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
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

					<FormControl id="image" mb={4}>
						<FormLabel fontWeight="bold">Upload an image</FormLabel>
						<Input
							type="file"
							accept="image/*"
							onChange={(e) => setImage(e.target.files[0])}
							bg="white"
							size="lg"
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
