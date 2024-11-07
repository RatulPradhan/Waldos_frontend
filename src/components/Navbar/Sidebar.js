import {
  Box,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  FiHome,
  FiBell,
  FiUser,
  FiCoffee,
  FiFilm,
  FiPrinter,
  FiCpu,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Sidebar({userType}) {
  const isAdmin = userType === "admin";
  return (
    <Box
      as="nav"
      w="15%"
      p="5"
      bg="beige"
      borderRight="1px"
      borderColor="gray.200"
      height="100%"
    >
      <VStack align="start" spacing="6" height="100%">
        <VStack align="start" spacing="3" fontSize="lg">
          <Link to="/home">
            <HStack>
              <FiHome />
              <Text>Home</Text>
            </HStack>
          </Link>
          <Link to="/notifications">
            <HStack>
              <FiBell />
              <Text>Notifications</Text>
            </HStack>
          </Link>
          <Link to="/profile">
            <HStack>
              <FiUser />
              <Text>My profile</Text>
            </HStack>
          </Link>
          {isAdmin && (<Link to="/admin-tools">
            <HStack>
              <FiCpu />
              <Text>Admin Tools</Text>
            </HStack>
          </Link>)}
        </VStack>

        <Text mt="10" fontWeight="bold" fontSize="xl">
          Channels
        </Text>
        <VStack align="start" spacing="3" fontSize="lg">
          <Link to="/ceramic">

          <HStack>
            <FiCoffee />
            <Text>Ceramic</Text>
          </HStack>
          </Link>
          <Link to="/printmaking">
          <HStack>
            <FiPrinter />
            <Text>Printmaking</Text>
          </HStack>
          </Link>
          <Link to="/film">
          <HStack>
            <FiFilm />
            <Text>Film</Text>
          </HStack>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
}
