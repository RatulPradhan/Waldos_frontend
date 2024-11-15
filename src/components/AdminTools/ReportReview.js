// AdminReview.js

import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
  TableContainer,
} from "@chakra-ui/react";

// Function to fetch reported comments data
const fetchReportedComments = async () => {
  try {
    const response = await fetch(`http://localhost:8080/all-reports`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reported comments:", error);
    return [];
  }
};

const ReportReview = () => {
  const [reportedComments, setReportedComments] = useState([]);

  useEffect(() => {
    // Fetch reported comments when the component mounts
    const getReportedComments = async () => {
      const comments = await fetchReportedComments();
      setReportedComments(comments);
    };

    getReportedComments();
  }, []);

  return (
    <Box
      p={6}
      maxW="1000px"
      mx="auto"
      bg="gray.50"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={4} color="gray.700">
        Report Review
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Post ID</Th>
              <Th>Reported By</Th>
              <Th>Reason</Th>
              <Th>Reported At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reportedComments.length > 0 ? (
              reportedComments.map((report) => (
                <Tr key={report.report_id}>
                  <Td>{report.post_id}</Td>
                  <Td>{report.reported_by}</Td>
                  <Td>{report.reason || "N/A"}</Td>
                  <Td>{new Date(report.created_at).toLocaleString()}</Td>
                  <Td>
                    <Button colorScheme="green" size="sm" mr={2}>
                      Resolve
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="6" textAlign="center">
                  No reported comments
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportReview;
