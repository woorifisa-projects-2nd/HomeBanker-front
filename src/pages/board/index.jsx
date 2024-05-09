import "regenerator-runtime";
import { api } from "../../api/api";
import React, { useState, useEffect } from "react";
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
  Alert,
  ModalCloseButton,
  Stack,
} from "@chakra-ui/react";
import CustomModal from "../../components/Modal";
import Mic from "../../assets/icon/mic.svg?react";
import useSpeechToText from "../../hook/useSpeechToText";
import BoardsTab from "../../components/board/admin/BoardsTab";
import Header from "../../components/Header";
import { useBoardsQuery } from "../../api/counsel/api";
import { BOARD_PAGINATION_SIZE } from "../../constants/index";

export default function Board() {
  const toast = useToast();
  const [boards, setBoards] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    itemCountPerPage: 0,
    pageCount: 0,
    currentPage: 0,
  });

  const [boardsData, isLoading, refetchBoards] = useBoardsQuery(
    BOARD_PAGINATION_SIZE,
    pagination.currentPage,
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    transcript,
    listening,
    quitSpeechToText,
    toggleListening,
    resetTranscript,
  } = useSpeechToText();

  const createBoard = () => {
    if (transcript.length === 0) {
      alert("문의 내용을 음성 인식으로 입력해주세요");
    } else {
      api
        .post(`/api/board`, {
          content: transcript,
        })
        .then(() => {
          refetchBoards();
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
    }
  };

  useEffect(() => {
    if (isOpen) {
      resetTranscript(); // 모달이 열릴 때마다 이전에 입력한 내용을 초기화합니다.
    }
  }, [isOpen]);

  useEffect(() => {
    if (boardsData) {
      setBoards(boardsData.data.boardItems);
      setPagination({
        totalItems: boardsData.data.pagination.totalElements,
        itemCountPerPage: BOARD_PAGINATION_SIZE,
        pageCount: boardsData.data.pagination.totalPages,
        currentPage: boardsData.data.pagination.pageNumber,
      });
    }
  }, [boardsData]);

  useEffect(() => {
    refetchBoards();
  }, [pagination.currentPage]);

  // 문의 작성 모달 종료
  const onModalClose = () => {
    quitSpeechToText();
    onClose();
  };

  const commonCellStyle = {
    fontFamily: "WooriDaumR",
    fontStyle: "normal",
    fontSize: "30px",
    lineHeight: "17px",
    color: "black",
    margin: "50px",
  };
  return (
    <>
      <Header />
      <Box ml={14} mr={14} mt={20}>
        <Text
          style={{
            textDecor: "underline",
            ...commonCellStyle,
            fontWeight: 600,
            // padding: "20px",
            textDecoration: "underline",
            textDecorationColor: "#3686DF",
            textDecorationThickness: "6px",
            textUnderlineOffset: "18px",
          }}
        >
          고객 상담게시판<span class="blind">고객 상담게시판</span>
        </Text>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          style={{
            ...commonCellStyle,
          }}
        >
          <Text
            style={{
              fontWeight: 200,
              fontSize: "25px",
            }}
          >
            문의하실 내용을 작성하시면 유선상으로 3일 이내에 답변 드리겠습니다.
            <span class="blind">
              문의하실 내용을 작성하시면 유선상으로 3일 이내에 답변
              드리겠습니다.
            </span>
          </Text>
          <Button
            size="lg"
            bg="#17CC8B"
            // _hover={{
            //   bg: "#15b481",
            // }}
            height={"fit-content"}
            paddingBottom="15px"
            paddingTop="15px"
            _hover={{
              textDecor: "underline",
              textDecorationThickness: "3px",
              textUnderlineOffset: "12px",
              textDecorationColor: "white",
            }}
            onClick={onOpen}
            // style={{ color: "white", fontSize: "1.5rem", marginRight: "30px" }}
          >
            {/* <TfiWrite size="24px" color="white" style={{ marginRight: "8px" }} /> */}
            <Text color="white" fontSize="30px">
              문의 작성
              <span class="blind">문의 작성</span>
            </Text>
          </Button>
        </Flex>
        <BoardsTab displayChangeStatus={false} />
      </Box>
      <CustomModal
        isOpen={isOpen}
        onClose={onModalClose}
        size={"xl"}
        // successMessage={"작성 완료"}
        // successAction={createBoard}
      >
        <Stack spacing={10} ml={14} mr={14}>
          <Text fontSize="30px" fontWeight={"bold"}>
            문의 작성
            <span class="blind">문의 작성</span>
          </Text>
          <Button width={"fit-content"} onClick={resetTranscript}>
            초기화
            <span class="blind">초기화</span>
          </Button>
          <ModalCloseButton onClick={onModalClose}></ModalCloseButton>
          <Flex
            direction="column"
            minHeight={500}
            justifyContent="center"
            alignItems="bottom"
          >
            <Box
              style={{
                padding: "20px",
                border: "solid black",
                borderRadius: "10px",
                marginBottom: "35px",
              }}
            >
              <Textarea
                focus="none"
                value={transcript}
                border="none"
                onChange={() => {}}
                style={{ fontSize: "27px", height: "220px" }}
              ></Textarea>
            </Box>

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
                    size="140px"
                    bg={listening ? "green" : "#D9D9D9"}
                    opacity="100%"
                  >
                    <Mic
                      width="80"
                      height="80"
                      fill={listening ? "white" : "black"}
                    />
                  </Circle>
                </Box>
              </Tooltip>
            </Flex>

            <Button
              alignSelf={"flex-end"}
              onClick={() => {
                createBoard();
                onClose();
              }}
              width={"fit-content"}
              bg="#3686DF"
              color="white"
              pl={6}
              pr={6}
              pt={8}
              pb={8}
              fontSize={"30px"}
              mb={16}
              _hover={{
                textDecor: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "8px",
              }}
            >
              작성완료
            </Button>
          </Flex>
        </Stack>
      </CustomModal>
    </>
  );
}
