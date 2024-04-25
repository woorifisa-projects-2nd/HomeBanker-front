import "regenerator-runtime";
import { api } from "../../api/api";
import React from "react";
import { TfiWrite } from "react-icons/tfi";
import {
  Button,
  useToast,
  useDisclosure,
  Textarea,
  Tooltip,
  Box,
  Circle,
  Flex,
  Text,
} from "@chakra-ui/react";
import CustomModal from "../../components/Modal";
import Mic from "../../assets/icon/mic.svg?react";
import useSpeechToText from "../../hook/useSpeechToText";
import BoardsTab from "../../components/board/admin/BoardsTab";
import Header from "../../components/Header";
import "./board.css";
export default function Board() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    transcript,
    listening,
    quitSpeechToText,
    toggleListening,
    resetTranscript,
  } = useSpeechToText();

  // 문의 작성 API
  const createBoard = () => {
    api
      .post(`/api/board`, {
        content: transcript,
      })
      .then(() => {
        toast({
          position: "top",
          title: "문의가 등록되었습니다",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        onClose();
        quitSpeechToText();
      });
  };

  // 문의 작성 모달 종료
  const onModalClose = () => {
    quitSpeechToText();
    onClose();
  };

  const commonCellStyle = {
    fontFamily: "Noto Sans",
    fontStyle: "normal",
    fontSize: "30px",
    lineHeight: "17px",
    color: "black",
    margin: "50px",
  };
  return (
    <>
      <Header />
      <Text
        style={{
          ...commonCellStyle,
          fontWeight: 600,
          width: "250px",
          height: "25px",
          padding: "20px",
          paddingBottom: "30px",
          borderBottom: "5px solid #3686DF",
        }}
      >
        고객 상담게시판
      </Text>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        style={{
          ...commonCellStyle,
          marginTop: "-20px",
        }}
      >
        <Text
          style={{
            fontWeight: 200,
            fontSize: "25px",
          }}
        >
          문의하실 내용을 작성하시면 3일 이내로 답변 드리겠습니다.
        </Text>
        <Button
          size="lg"
          bg="#17CC8B"
          _hover={{
            bg: "#15b481",
          }}
          onClick={onOpen}
          style={{ color: "white", fontSize: "1.5rem", marginRight: "30px" }}
        >
          <TfiWrite size="24px" color="white" style={{ marginRight: "8px" }} />
          문의 작성
        </Button>
      </Flex>
      <BoardsTab displayChangeStatus={false} />
      <CustomModal
        title={"문의 작성"}
        isOpen={isOpen}
        onClose={onModalClose}
        size={"xl"}
        successMessage={"작성 완료"}
        successAction={createBoard}
      >
        <Button onClick={resetTranscript}>초기화</Button>
        <Flex
          direction="column"
          minHeight={500}
          justifyContent="center"
          alignItems="bottom"
        >
          <Textarea
            focus="none"
            value={transcript}
            border="none"
            onChange={() => {}}
          ></Textarea>

          {/* 음성인식 버튼 */}
          <Flex width="size='68px">
            <Tooltip
              label={listening ? "음성 인식 중지하기" : "음성 인식하기"}
              fontSize="md"
              color="white"
            >
              <Box
                margin="auto"
                justifyContent="center"
                alignItems="center"
                onClick={toggleListening}
              >
                <Circle
                  cursor="pointer"
                  size="68px"
                  bg={listening ? "green" : "#D9D9D9"}
                  opacity="100%"
                >
                  <Mic
                    width="35"
                    height="35"
                    fill={listening ? "white" : "black"}
                  />
                </Circle>
              </Box>
            </Tooltip>
          </Flex>
        </Flex>
      </CustomModal>
    </>
  );
}
