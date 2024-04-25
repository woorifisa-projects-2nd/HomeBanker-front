import React, { useEffect, useState } from "react";
import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useToast,
} from "@chakra-ui/react";
import Pagination from "../../Pagination";
import { useBoardsQuery } from "../../../api/counsel/api";
import { BOARD_PAGINATION_SIZE } from "../../../constants/index";
import { api } from "../../../api/api";
import NoReply from "../../../assets/icon/NoReply.svg";
import YesReply from "../../../assets/icon/YesReply.svg";

// 공통으로 사용할 스타일 객체 정의
const commonCellStyle = {
  fontFamily: "Noto Sans",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "40px",
  color: "black",
  // textAlign: "center",
};

export default function BoardsTab({ displayChangeStatus = true }) {
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
  console.log(boardsData);
  // 상담 처리 완료 API
  const changeBoardStatus = (boardId) => {
    api.put(`/api/banker/board/${boardId}`).then(() => {
      refetchBoards();
      toast({
        position: "top",
        title: "처리 완료 되었습니다.",
        status: "success",
        duration: 800,
        isClosable: true,
      });
    });
  };

  // 상담 삭제 API
  const deleteBoard = (boardId) => {
    api.delete(`/api/banker/board/${boardId}`).then(() => {
      refetchBoards();
      toast({
        position: "top",
        title: "삭제 되었습니다.",
        status: "success",
        duration: 800,
        isClosable: true,
      });
    });
  };
  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
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

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {boards && (
            <TableContainer
              style={{
                ...commonCellStyle,
                marginLeft: "50px",
                marginRight: "50px",
              }}
            >
              <Table variant="simple">
                <Thead>
                  <Tr bg="#dcecff">
                    <Th style={{ ...commonCellStyle, paddingLeft: "50px" }}>
                      내용
                    </Th>
                    <Th style={{ ...commonCellStyle, textAlign: "center" }}>
                      등록일
                    </Th>
                    <Th style={{ ...commonCellStyle, textAlign: "center" }}>
                      유선 회신 여부
                    </Th>
                    <Th style={{ ...commonCellStyle, textAlign: "center" }}>
                      담당자 이름
                    </Th>
                    <Th style={{ ...commonCellStyle, textAlign: "center" }}>
                      처리일
                    </Th>
                    {displayChangeStatus && (
                      <Th style={{ ...commonCellStyle }}>처리 완료</Th>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {boards.map((item) => (
                    <Tr key={item.boardId}>
                      <Td style={{ paddingLeft: "50px" }}>
                        {truncateString(item.content, 15)}
                      </Td>
                      <Td style={{ textAlign: "center" }}>{item.createdAt}</Td>
                      <Td>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {item.replyYN === "Y" ? (
                            <img src={YesReply} alt="Yes" />
                          ) : (
                            <img src={NoReply} alt="No" />
                          )}
                        </div>
                      </Td>
                      <Td style={{ textAlign: "center" }}>
                        {item.customerName}
                      </Td>
                      <Td style={{ textAlign: "center" }}>{item.updatedAt}</Td>
                      {displayChangeStatus && (
                        <Td>
                          <Button
                            bgColor={item.replyYN === "Y" ? "gray" : "blue"}
                            onClick={() => changeBoardStatus(item.boardId)}
                            isDisabled={item.replyYN === "Y"}
                          >
                            처리완료
                          </Button>
                          <Button
                            bgColor="red"
                            onClick={() => deleteBoard(item.boardId)}
                          >
                            삭제
                          </Button>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
          <div style={{ marginTop: "30px" }}>
            {pagination.totalItems > 0 && (
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                totalItems={pagination.totalItems}
                itemCountPerPage={pagination.itemCountPerPage}
                pageCount={pagination.pageCount}
                currentPage={pagination.currentPage}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
