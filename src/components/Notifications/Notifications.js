
import {
	Flex,
} from "@chakra-ui/react";

import Sidebar from "../Navbar/Sidebar";
import CreateAnnouncement from "./CreateAnnouncement";

export default function Notifications({userData}) {
	return (
    <Flex height="100vh">
      <Sidebar userType={userData.user_type} />
      <CreateAnnouncement />
    </Flex>
  );
}
