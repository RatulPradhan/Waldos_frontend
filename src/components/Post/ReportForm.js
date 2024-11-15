import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";

const ReportForm = ({ isOpen, onClose, postId, commentId, reportedBy }) => {
  const [reportReason, setReportReason] = useState('');
  const toast = useToast();

  // Handle post report submission
  const handlePostReport = async () => {
    try {
      const response = await fetch(`http://localhost:8080/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          reported_by: reportedBy,
          reason: reportReason,
        }),
      });
      if (response.ok) {
        toast({
          title: "Post report submitted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setReportReason(''); // Reset reason after submission
        onClose(); // Close modal
      } else {
        console.error('Failed to submit post report');
      }
    } catch (err) {
      console.error("Error submitting post report:", err);
    }
  };

  // Handle comment report submission
  const handleCommentReport = async () => {
    try {
      const response = await fetch(`http://localhost:8080/reportComment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment_id: commentId,
          reported_by: reportedBy,
          reason: reportReason,
        }),
      });
      if (response.ok) {
        toast({
          title: "Comment report submitted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setReportReason(''); // Reset reason after submission
        onClose(); // Close modal
      } else {
        console.error('Failed to submit comment report');
      }
    } catch (err) {
      console.error("Error submitting comment report:", err);
    }
  };

  // Determine which function to call based on the presence of postId or commentId
  const handleReport = () => {
    if (commentId) {
      handleCommentReport();
    } else if (postId) {
      handlePostReport();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{commentId ? "Report Comment" : "Report Post"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to report this {commentId ? "comment" : "post"}?</Text>
          <Textarea
            placeholder="Enter reason for reporting"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            mt={3}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
          <Button colorScheme="yellow" onClick={handleReport}>Report</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportForm;
