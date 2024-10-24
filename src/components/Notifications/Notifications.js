import { useState } from "react";
import {
	Box,
	Flex,
	Button,
	Input,
	Textarea,
	VStack,
	Avatar,
} from "@chakra-ui/react";

import Sidebar from "../Navbar/Sidebar";
import CreateAnnouncement from "./CreateAnnouncement";

export default function Notifications() {
	return (
		<Flex height="100vh">
			<Sidebar />
			<CreateAnnouncement />
		</Flex>
	);
}
