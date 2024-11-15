import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Button, Textarea } from "@chakra-ui/react";

const BioSection = ({ user_id }) => {
	const [bio, setBio] = useState("");
	const [createdAt, setCreatedAt] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [newBio, setNewBio] = useState("");

	useEffect(() => {
		fetch(`http://localhost:8080/user/${user_id}/bio`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch bio JSON");
				}
				return response.json();
			})
			.then((data) => {
				setBio(data.bio);
			})
			.catch((error) => {
				console.error("Error fetching bio:", error);
			});
	}, [user_id]);

	useEffect(() => {
		fetch(`http://localhost:8080/user/${user_id}/created_at`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch JSON date");
				}
				return response.json();
			})
			.then((data) => {
				if (!data.created_at) {
					throw new Error("Invalid date format");
				}
				const date = new Date(data.created_at);
				if (isNaN(date.getTime())) {
					throw new Error("Invalid date");
				}
				const formattedDate = date.toLocaleDateString("en-US", {
					day: "numeric",
					month: "long",
					year: "numeric",
				});
				setCreatedAt(formattedDate);
			})
			.catch((error) => {
				console.error("Error fetching date:", error);
			});
	}, [user_id]);

	const handleEditClick = () => {
		setNewBio(bio);
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		// Update the bio on the server
		fetch(`http://localhost:8080/user/${user_id}/bio`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ bio: newBio }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to update bio");
				}
				return response.json();
			})
			.then((data) => {
				setBio(data.bio);
				setIsEditing(false);
			})
			.catch((error) => {
				console.error("Error updating bio:", error);
			});
	};

	const handleDiscardClick = () => {
		setIsEditing(false);
	};

	return (
		<Box
			bg="#F6DEB5"
			p="10px"
			borderRadius="10%"
			color="#6a0202"
			fontFamily="'Petrona', serif"
			fontSize="1rem"
			w="100%"
			maxW={isEditing ? "400px" : "220px"} // Increase width when editing
			maxH={isEditing ? "800px" : "auto"} // Increase height when editing
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
				<Button ml="10px" size="xs" onClick={handleEditClick}>
					Edit
				</Button>
			</Heading>
			{isEditing ? (
				<>
					<Textarea
						mt="10px"
						value={newBio}
						onChange={(e) => setNewBio(e.target.value)}
						height="300px" // Increase height of Textarea when editing
					/>
					<Button
						mt="10px"
						colorScheme="teal"
						size="sm"
						onClick={handleSaveClick}
					>
						Save
					</Button>
					<Button
						mt="10px"
						ml="5px"
						colorScheme="red"
						size="sm"
						onClick={handleDiscardClick}
					>
						Discard
					</Button>
				</>
			) : (
				<Text mt="10px" fontWeight="400" lineHeight="1.4">
					{bio}
				</Text>
			)}
			<Text mt="20px" fontWeight="bold" fontSize="0.9rem">
				Joined{" "}
				<Text as="span" fontStyle="italic">
					{createdAt}
				</Text>
			</Text>
		</Box>
	);
};

export default BioSection;
