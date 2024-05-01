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
  Stack,
  useToast,
} from "@chakra-ui/react";
import CheckIdentification from "./CheckIdentification";
import useCheckRole from "../hook/useCheckRole";
import RoundCheck from "../assets/icon/round-check.svg?react";
import Capture from "../assets/icon/capture.svg";
import { IoChatboxEllipses } from "react-icons/io5";
import useSpeechToText from "../hook/useSpeechToText";

export default function CounselToolbar({ publisher, subscriber }) {
  const [isIdentifiedUser, setIdentifyUser] = useState(false);
  const { role } = useCheckRole();
  const speechRef = useRef(null);

  const toast = useToast();

  const { transcript, listening, toggleListening } = useSpeechToText();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [subtileText, setSubtileText] = useState("");

  // 음성인식 내용 늘어나면 끝으로 자동 스크롤 시키는 함수
  const scrollToEnd = useCallback(() => {
    if (speechRef.current) {
      speechRef.current.scrollLeft = speechRef.current.scrollWidth;
    }
  }, [speechRef.current]);

  useEffect(() => {
    if (listening && role === "ROLE_ADMIN") {
      toast({
        position: "top",
        title: "음성인식을 시작합니다. 자막을 고객에게 노출합니다",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  }, [listening]);

  const sendMessage = () => {
    if (publisher) {
      publisher.stream.session.signal({
        data: JSON.stringify("request"),
        type: "identify",
      });
    }
  };

  // 양쪽 다 닫히는 메세지 전송
  const closeModalAction = () => {
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
    if (listening) {
      if (transcript.length > 0) {
        publisher.stream.session.signal({
          data: JSON.stringify(transcript),
          type: "subtitle",
        });
      }
    }
  }, [transcript]);

  // 자막 받는 부분
  publisher.stream.session.on("signal:subtitle", (event) => {
    const dataTest = JSON.parse(event.data);
    setSubtileText(dataTest);
    scrollToEnd();
  });

  publisher.stream.session.on("signal:success", (event) => {
    const data = JSON.parse(event.data);
    if (data === "request") {
      onOpen();
    }
  });

  useEffect(() => {
    if (isIdentifiedUser && role === "ROLE_ADMIN") {
      toast({
        position: "top",
        title: "신분증 인증이 완료되었습니다",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    }
  }, [isIdentifiedUser]);

  const comfirmSignal = () => {
    publisher.stream.session.signal({
      data: JSON.stringify("confirm"),
      type: "confirm",
    });
  };

  const [isConfirm, setConfirm] = useState(false);

  publisher.stream.session.on("signal:confirm", (event) => {
    const data = JSON.parse(event.data);
    if (data === "confirm") {
      if (role === "ROLE_CUSTOMER") {
        setConfirm(true);
      }
    }
  });

  // 신분증 검증 완료 알림 (고객)
  useEffect(() => {
    if (isConfirm && role === "ROLE_CUSTOMER") {
      toast({
        duration: 2000,
        position: "top",
        render: () => (
          <Stack color="white" p={6} bg="#3686DF" borderRadius={20}>
            <Text textAlign="center" fontSize="30">
              신분증 검증이 완료되었습니다
            </Text>
          </Stack>
        ),
      });
    }
  }, [isConfirm]);

  return (
    <>
      <Flex position="absolute" bottom={0} width={"100%"} bgColor={"black"}>
        {role === "ROLE_ADMIN" ? (
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
                <Text color="white">신분증 검증하기</Text>
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
        ) : (
          <Flex
            width={"100%"}
            height={100}
            bgColor="black"
            whiteSpace="noWrap"
            overflow="auto"
            ref={speechRef}
            align="center"
          >
            <Text color="white" fontSize={40}>
              {subtileText}
            </Text>
          </Flex>
        )}
      </Flex>

      <CheckIdentification
        isOpen={isOpen}
        onClose={() => {
          onClose();
          closeModalAction();
        }}
        onOpen={onOpen}
        setIdentifyUser={setIdentifyUser}
        isIdentifiedUser={isIdentifiedUser}
        comfirmSignal={comfirmSignal}
        streamManager={role === "ROLE_ADMIN" ? subscriber : publisher}
      />
    </>
  );
}
