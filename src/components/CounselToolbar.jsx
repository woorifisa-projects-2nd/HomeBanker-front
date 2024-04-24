import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Text,
  Box,
  useDisclosure,
  Flex,
  Image,
  Textarea,
  Button,
  HStack,
  Input,
} from "@chakra-ui/react";
import CheckIdentification from "./CheckIdentification";
import useCheckRole from "../hook/useCheckRole";
import RoundCheck from "../assets/icon/round-check.svg?react";
import Capture from "../assets/icon/capture.svg";
import { IoChatboxEllipses } from "react-icons/io5";
import useSpeechToText from "../hook/useSpeechToText";

export default function CounselToolbar({ publisher }) {
  const [isIdentifiedUser, setIdentifyUser] = useState(false);
  const { role } = useCheckRole();
  const speechRef = useRef(null);

  const { transcript, listening, toggleListening } = useSpeechToText();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const scrollToEnd = useCallback(() => {
    if (speechRef.current) {
      speechRef.current.scrollLeft = speechRef.current.scrollWidth;
    }
  }, [speechRef.current]);

  const sendMessage = () => {
    if (publisher) {
      publisher.stream.session.signal({
        data: JSON.stringify("request"),
        type: "identify",
      });
    }
  };

  // 양쪽 다 닫히는 메세지 전송
  const closeModalMessage = () => {
    if (publisher && role === "ROLE_ADMIN") {
      publisher.stream.session.signal({
        data: JSON.stringify("close"),
        type: "identify",
      });
    }
  };

  publisher.stream.session.on("signal:identify", (event) => {
    const data = JSON.parse(event.data);
    if (data === "close") {
      if (role === "ROLE_CUSTOMER") {
        onClose();
      }
    }
  });

  publisher.stream.session.on("signal:identify", (event) => {
    const data = JSON.parse(event.data);
    if (data === "request") {
      onOpen();
    }
  });

  useEffect(() => {
    if (transcript.length > 10) {
      scrollToEnd();
    }
  }, [transcript]);

  return (
    <>
      <Flex position="absolute" bottom={0} width={"100%"} bgColor={"black"}>
        {role === "ROLE_ADMIN" && (
          <HStack spacing={10} p={2} margin={"0 auto"} width={"fit-content"}>
            <HStack>
              <RoundCheck fill={isIdentifiedUser ? "#3686DF" : "#D3D3D3"} />
              <Text color="white">
                {isIdentifiedUser ? "신분증 확인 완료" : "신분증 미확인"}
              </Text>
            </HStack>

            {isIdentifiedUser ? (
              <></>
            ) : (
              <HStack onClick={sendMessage} cursor="pointer">
                <Image src={Capture} />
                <Text color="white">캡쳐</Text>
              </HStack>
            )}

            <HStack onClick={toggleListening} cursor="pointer">
              <IoChatboxEllipses
                fontSize="20px"
                color="#D3D3D3"
                width="22px"
                height="22px"
              />
              <Text color="white">
                {listening ? "음성인식 중지" : "음성인식 시작"}
              </Text>
            </HStack>
          </HStack>
        )}

        {role === "ROLE_CUSTOMER" && (
          <Box
            width={"100%"}
            height={100}
            bgColor="black"
            whiteSpace="noWrap"
            overflow="auto"
            ref={speechRef}
          >
            <Text color="white" fontSize={40}>
              {transcript}
            </Text>
          </Box>
        )}
      </Flex>

      <CheckIdentification
        isOpen={isOpen}
        onClose={() => {
          onClose();
          closeModalMessage();
        }}
        onOpen={onOpen}
        setIdentifyUser={setIdentifyUser}
        isIdentifiedUser={isIdentifiedUser}
        streamManager={publisher}
      />
    </>
  );
}
