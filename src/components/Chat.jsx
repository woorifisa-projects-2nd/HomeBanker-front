import React, { useRef, useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Stack,
  Spacer,
  Grid,
  GridItem,
  Textarea,
  Text,
} from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";
import "./chat.css";

export default function ChatComponent({ user }) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const nickname = JSON.parse(user.stream.connection.data).clientData;

  const chatScroll = useRef();
  const inputRef = useRef();

  const messageEndRef = useRef();

  user.stream.session.on("signal:chat", (event) => {
    const data = JSON.parse(event.data);

    if (data.message !== "" && data.message !== " " && data.message !== null) {
      const newMessage = {
        streamId: data.streamId,
        nickname: data.nickname,
        message: data.message,
      };

      if (data.nickname !== nickname)
        setMessageList([...messageList, newMessage]);
    }
  });

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePressKey = (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (user && message) {
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: nickname,
          streamId: user.stream.streamId,
        };
        user.stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
        setMessageList([
          ...messageList,
          {
            message: message,
            nickname: nickname,
            streamId: user.stream.streamId,
          },
        ]);
        setMessage("");
      }
    }
  };

  const findMessageSender = (sender) => {
    console.log(`sender : ${sender}`);
    console.log(`nickname: ${nickname}`);
    return sender === nickname ? "me" : "other";
  };

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <Grid
      maxHeight="calc(100vh - 230px)"
      templateRows="repeat(12, 1fr)"
      width={"100%"}
      gap={"10px"}
    >
      <GridItem rowSpan={10} overflowY={"auto"} className={"textBox"}>
        <Stack width={"100%"}>
          {Array.from(messageList).map((m, index) => (
            <ChatMessage
              ref={chatScroll}
              key={index}
              message={m.message}
              sender={findMessageSender(m.nickname)}
            />
          ))}
        </Stack>
        <Stack ref={messageEndRef}></Stack>
      </GridItem>

      <GridItem rowSpan={2}>
        <Stack>
          <Textarea
            height={214}
            width={"100%"}
            fontSize={"42px"}
            borderColor="#0067AC"
            focusBorderColor="#0067AC"
            placeholder="채팅 메세지를 입력하세요"
            ref={inputRef}
            value={message}
            onChange={handleChange}
            onKeyPress={handlePressKey}
          />
          <Spacer />
          <Button
            bgColor={!message ? "#CFCFCF" : "#3686DF"}
            isDisabled={!message}
            id="sendButton"
            onClick={sendMessage}
          >
            <Text color={!message ? "black" : "white"}>보내기</Text>
          </Button>
        </Stack>
      </GridItem>
    </Grid>
  );
}
