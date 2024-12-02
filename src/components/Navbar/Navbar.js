import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ username }) => {
	const navigate = useNavigate();

	const logout = () => {
		window.localStorage.removeItem("isLoggedIn");
		window.localStorage.removeItem("userData");
		navigate("/");
		window.location.reload();
	};

	return (
		<Flex
			bg="white"
			height="60px"
			padding="6px 40px"
			position="sticky"
			top="0"
			align="center"
			justify="space-between"
			boxShadow="md"
		>
			<Flex>
				<Image src="/images/Waldos Logo.jpeg" height="50px" />
			</Flex>
			<Flex align="center">
				<Text fontSize="lg" color="gray.700" fontWeight="bold" mr={2}>
					{username}
				</Text>
				{window.localStorage.getItem("isLoggedIn") && (
					<Button onClick={() => logout()}>Logout</Button>
				)}
			</Flex>
		</Flex>
	);
};

export default Navbar;
