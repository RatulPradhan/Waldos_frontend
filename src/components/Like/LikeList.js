import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Avatar,
  VStack,
  HStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LikeList = ({ isOpen, onClose, likedByUsers, userId }) => {
  const navigate = useNavigate();

  const goToUserProfile = (user_id) => {
    if (userId === user_id) {
      navigate("/profile"); // Redirect to logged-in user's profile
    } else {
      navigate(`/profile/${user_id}`); // Redirect to other user's profile
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Liked by</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            {likedByUsers.map(user => (
              <HStack key={user.user_id} spacing={3} onClick={() => goToUserProfile(user.user_id)} // Add onClick handler
              style={{ cursor: "pointer" }} // Add pointer cursor for clarity
                >
                <Avatar 
                  size="sm" 
                  src={
                    user.profile_picture
                      ? `${process.env.PUBLIC_URL}/images/profile_pictures/${user.profile_picture}`
                      : undefined
                  }
                />
                <Text>{user.username}</Text>
              </HStack>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LikeList;
