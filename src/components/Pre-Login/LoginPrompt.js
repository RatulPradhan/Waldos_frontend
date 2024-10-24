import { Box, Button, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPrompt = ({ setUser}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

  const handleLogin = (email, password) =>{
    fetch(`http://localhost:8080/password/${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data === undefined || data.length == 0) {
          setErrorMessage("We couldn't find an account under that email.");
          return;
        }
        var u_pass = data[0].password;
    
        setErrorMessage("");
        if (u_pass != password) {
          console.log(u_pass);
          setErrorMessage("Incorrect password. Please try again.");
          return;
        }
    
        setUser(email);
        navigate("/home");
        window.localStorage.setItem("isLoggedIn", true);
      });
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
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <Text color="red.500" fontSize="sm">
              {errorMessage}
            </Text>
          )}
          <Button
            bg="orange.600"
            color="white"
            _hover={{ bg: "orange.500" }}
            size="lg"
            onClick={() => handleLogin(email, password)}
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
