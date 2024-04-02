import 'regenerator-runtime'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/api';
import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Switch,
  Button,
  useToast,
  useDisclosure,
  Textarea,
  Tooltip,
  Box,
  Circle,
  Flex
} from '@chakra-ui/react'
import Pagination from '../../components/Pagination';
import CustomModal from '../../components/Modal';
import Mic from "../../assets/icon/mic.svg?react"
import useSpeechToText from '../../hook/useSpeechToText';

const PAGINATION_SIZE = 5;

export default function Board() {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { transcript, listening, quitSpeechToText, toggleListening, resetTranscript } = useSpeechToText();

  const [boards, setBoards] = useState([])
  const [pagination, setPagination] = useState({
    totalItems: 0,
    itemCountPerPage: 0,
    pageCount: 0,
    currentPage: 0
  })




  // 상담게시글 리스트 조회
  const { data, isLoading, refetch: refetchBoards } = useQuery({
    queryKey: ['boards', pagination.currentPage],
    queryFn: () => api.get(`/api/board?size=${PAGINATION_SIZE}&page=${pagination.currentPage}`),
    keepPreviousData: true,
  })

  // 상담 처리 완료 API
  const changeBoardStatus = (boardId) => {
    api.put(`/api/banker/board/${boardId}`).then(() => {
      refetchBoards()
      toast({
        position: 'top',
        title: '처리 완료 되었습니다.',
        status: 'success',
        duration: 800,
        isClosable: true,
      })
    })
  }

  // 삭제 API
  const deleteBoard = (boardId) => {
    api.delete(`/api/banker/board/${boardId}`).then(() => {
      refetchBoards()
      toast({
        position: 'top',
        title: '삭제 되었습니다.',
        status: 'success',
        duration: 800,
        isClosable: true,
      })
    }
    )
  }



  // 문의 작성 API
  const createBoard = () => {
    api.post(`/api/board`, {
      "content": transcript
    }).then(() => {
      toast({
        position: 'top',
        title: '문의가 등록되었습니다',
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
      onClose();
      quitSpeechToText();
    }
    )
  }

  // 문의 작성 모달 종료
  const onModalClose = () => {
    quitSpeechToText()
    onClose();
  }

  useEffect(() => {
    if (data) {
      setBoards(data.data.boardItems);
      setPagination({
        totalItems: data.data.pagination.totalElements,
        itemCountPerPage: PAGINATION_SIZE,
        pageCount: data.data.pagination.totalPages,
        currentPage: data.data.pagination.pageNumber
      })
    }
  }, [data])

  useEffect(() => {
    refetchBoards()
  }, [pagination.currentPage])

  return (
    <>
      <div>상담게시판</div>
      {isLoading ?
        <Spinner />
        :
        <>
          <Button onClick={onOpen}>문의 작성</Button>

          {boards &&
            <TableContainer>
              <Table variant='simple'>
                {/* 테이블 헤더 */}
                <Thead>
                  <Tr>
                    <Th>내용</Th>
                    <Th>등록일</Th>
                    <Th>유선 회신 여부</Th>
                    <Th>담당자 이름</Th>
                    <Th>처리일</Th>
                    <Th>처리 완료</Th>
                    <Th>노출 여부</Th>
                  </Tr>
                </Thead>

                {/* 테이블 바디 */}
                <Tbody>
                  {boards.map(item => {
                    return <Tr key={item.boardId}>
                      <Td>{item.content}</Td>
                      <Td>{item.createdAt}</Td>
                      <Td>{item.replyYN}</Td>
                      <Td>{item.customerName}</Td>
                      <Td>{item.updatedAt}</Td>
                      <Td>
                        <Button
                          bgColor={item.replyYN === "Y" ? "gray" : "blue"}
                          onClick={() => changeBoardStatus(item.boardId)}
                          isDisabled={item.replyYN === "Y"}>처리완료
                        </Button>
                        <Button bgColor={"red"}
                          onClick={() => deleteBoard(item.boardId)}
                        >
                          삭제
                        </Button>
                      </Td>
                      <Td><Switch size='lg' /></Td>
                    </Tr>
                  })}
                </Tbody>

              </Table>
            </TableContainer>
          }

          {/* 페이지네이션 */}
          {pagination.totalItems > 0 &&
            <Pagination pagination={pagination}
              setPagination={setPagination}
              totalItems={pagination.totalItems}
              itemCountPerPage={pagination.itemCountPerPage}
              pageCount={pagination.pageCount}
              currentPage={pagination.currentPage}
            />}
        </>}

      <CustomModal
        title={"문의 작성"}
        isOpen={isOpen} onClose={onModalClose} size={"xl"} successMessage={"작성 완료"} successAction={createBoard}>
        <Button onClick={resetTranscript}>초기화</Button>
        <Flex direction="column" minHeight={500} justifyContent="center" alignItems="bottom">
          <Textarea focus="none" value={transcript} border="none" onChange={() => { }} ></Textarea >

          {/* 음성인식 버튼 */}
          <Flex width="size='68px">
            <Tooltip label={listening ? "음성 인식 중지하기" : '음성 인식하기'} fontSize='md' color="white">
              <Box margin="auto" justifyContent="center" alignItems="center" onClick={toggleListening}>
                <Circle cursor="pointer" size='68px' bg={listening ? "green" : '#D9D9D9'} opacity="100%">
                  <Mic width="35" height="35" fill={listening ? "white" : "black"} />
                </Circle>
              </Box>
            </Tooltip>
          </Flex>
        </Flex>
      </CustomModal>
    </>
  )
}
