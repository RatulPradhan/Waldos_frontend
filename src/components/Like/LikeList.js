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

const LikeList = ({ isOpen, onClose, likedByUsers }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Liked by</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            {likedByUsers.map(user => (
              <HStack key={user.user_id} spacing={3}>
                <Avatar src={user.avatar_url} name={user.username} />
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
