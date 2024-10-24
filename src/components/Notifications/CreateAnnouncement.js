import { useState } from "react";
import { Box, Button, Input, Textarea } from "@chakra-ui/react";

const CreateAnnouncement = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = async () => {
		try {
			const response = await fetch("http://localhost:8080/announcement", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, content }),
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			console.log("Announcement created:", data);
		} catch (error) {
			console.error("Error creating announcement:", error);
		}
	};

	return (
		<Box>
			<Input
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Textarea
				placeholder="Content"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<Button onClick={handleSubmit}>Create Announcement</Button>
		</Box>
	);
};

export default CreateAnnouncement;
