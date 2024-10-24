import { Box, Button, Flex, Heading, Input, Stack, } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPrompt = ({setUser}) => {

  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  const handleLogin = (email) =>{
    setUser(email);
    navigate("/home");
    window.localStorage.setItem("isLoggedIn", true)
  }



  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      backgroundImage="url('path-to-your-background-image.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        bg="#F6DEB5"
        p={8}
        rounded="lg"
        boxShadow="lg"
        maxW="400px"
        textAlign="center"
      >
        <Heading as="h3" size="lg" color="red.700" mb={4}>
          SIGN IN TO SEE THE COMMUNITY!
        </Heading>
        <Stack spacing={4}>
          <Input
            type="email"
            placeholder="Email"
            variant="outline"
            focusBorderColor="orange.400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            variant="outline"
            focusBorderColor="orange.400"
          />
          <Button
            bg="orange.600"
            color="white"
            _hover={{ bg: "orange.500" }}
            size="lg"
            onClick={() => handleLogin(email)}
          >
            LOGIN
          </Button>
        </Stack>
        {/* <Text mt={4} color="orange.700">
                Need an account?{" "}
                <Button variant="link" colorScheme="orange">
                    Sign up!
                </Button>
                </Text> */}
      </Box>
    </Flex>
  );
};

export default LoginPrompt;
