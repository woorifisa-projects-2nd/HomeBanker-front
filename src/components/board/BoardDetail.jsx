import React from "react";
import { Flex, Box, Button, Spacer } from "@chakra-ui/react";

const BoardDetail = ({ selected, onClose }) => {
  // 공통으로 사용할 스타일 객체 정의
  const commonStyle = {
    fontFamily: "Noto Sans",
    fontStyle: "normal",

    fontSize: "20px",
    lineHeight: "30px",
    color: "black",
  };

  return (
    <>
      <Flex direction="column" style={{ ...commonStyle }}>
        <Flex justify="space-between" style={{ marginBottom: "30px" }}>
          <Box>작성 날짜 : {selected.createdAt}</Box>
          <Box>작성 고객 : {selected.customerName}</Box>
        </Flex>

        <Box
          style={{
            padding: "10px",
            border: "solid black",
            borderRadius: "5px",
            marginBottom: "30px",
          }}
        >
          {selected.content}{" "}
        </Box>

        <Box style={{ marginBottom: "30px" }}>
          고객 전화번호 : {selected.telephone}
        </Box>

        <Box style={{ marginBottom: "30px" }}>
          처리 완료 여부 : {selected.replyYN}
        </Box>

        {selected.replyYN === "Y" ? (
          <>
            <Box style={{ marginBottom: "30px" }}>
              처리 날짜 : {selected.updatedAt}
            </Box>
            <Box style={{ marginBottom: "30px" }}>
              처리 담당자 : {selected.banker.bankerName}
            </Box>
          </>
        ) : null}
      </Flex>
      <Button colorScheme="blue" mr={3} onClick={onClose}>
        닫기
      </Button>
    </>
  );
};

export default BoardDetail;
