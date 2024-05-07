import React from "react";
import { Text, Box } from "@chakra-ui/react";

const ChatMessage = ({ message, sender }) => {
  console.log(`message bubble by ${sender}`);
  return (
    <>
      {sender === "me" ? (
        <Box
          alignSelf={"end"}
          width="fit-content"
          display="inline-block"
          overflowWrap="anywhere"
          bgColor="#33C659"
          borderTopLeftRadius="20"
          borderTopRightRadius="20"
          borderBottomLeftRadius="20"
          padding={4}
        >
          <Text color={"white"} fontSize={"42px"}>
            {message}
            <span class="blind">{message}</span>
          </Text>
        </Box>
      ) : (
        <Box
          bgColor={"#D3D3D3"}
          style={{
            width: "fit-content",
            display: "inline-block",
            overflowWrap: "anywhere",
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
            borderBottomRightRadius: "30px",
            backgroundColor: "#62B8FF",
            padding: "15px",
          }}
        >
          <Text fontSize={"42px"}>
            {message}
            <span class="blind">{message}</span>
          </Text>
        </Box>
      )}
    </>
  );
};

export default ChatMessage;
