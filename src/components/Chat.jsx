import React, { useRef, useEffect } from "react";
import { useState } from "react";
import {
  Flex,
  Button,
  Stack,
  Spacer,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";
import { IoMdChatbubbles } from "react-icons/io";

export default function ChatComponent({ user }) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState();
  const nickname = JSON.parse(user.stream.connection.data).clientData;

  const chatScroll = useRef();
  const inputRef = useRef();

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

  const scrollToBottom = () => {
    chatScroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div
      id="chatContainer"
      style={{
        height: "auto",
        width: "100%",
        backgroundColor: "#0083CA",
        fontFamily: "WooriDaum",
      }}
    >
      <Flex direction="column">
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "30px",
            padding: "5px",
          }}
        >
          <Flex>
            <IoMdChatbubbles style={{ display: "inline" }} size="2rem" />
            <div style={{ marginLeft: "10px" }}>채팅방</div>
          </Flex>
        </div>
        <div
          id="chatComponent"
          style={{
            marginLeft: "30px",
            marginRight: "30px",
            marginBottom: "30px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              width: "auto",
              height: "500px",
              overflowY: "auto",
              paddingBottom: "30px",
            }}
          >
            <Flex direction="column">
              <Stack>
                {Array.from(messageList).map((m, index) => (
                  <ChatMessage
                    ref={chatScroll}
                    key={index}
                    message={m.message}
                    sender={findMessageSender(m.nickname)}
                  />
                ))}
              </Stack>
            </Flex>
          </div>
          <Flex>
            <Input
              width="75%"
              focusBorderColor="#0067AC"
              placeholder="채팅 메세지를 입력해보세요"
              ref={inputRef}
              value={message}
              onChange={handleChange}
              onKeyPress={handlePressKey}
            />
            <Spacer />
            <Button id="sendButton" onClick={sendMessage}>
              보내기
            </Button>
          </Flex>
        </div>
      </Flex>
    </div>
  );
}
