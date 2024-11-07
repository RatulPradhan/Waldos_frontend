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

const ReportForm = ({ isOpen, onClose, postId, reportedBy }) => {
  const [reportReason, setReportReason] = useState('');
  const toast = useToast();

  // Handle report submission
  const handleReport = async () => {
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
          title: "Report submitted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setReportReason(''); // Reset reason after submission
        onClose(); // Close modal
      } else {
        console.error('Failed to submit report');
      }
    } catch (err) {
      console.error("Error submitting report:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Report Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to report this post?</Text>
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
