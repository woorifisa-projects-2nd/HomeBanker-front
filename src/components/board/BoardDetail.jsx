import React from "react";
import { Flex, Box, Button, Spacer, Text, Stack } from "@chakra-ui/react";

const BoardDetail = ({ selected, onClose }) => {
  // 공통으로 사용할 스타일 객체 정의
  const commonStyle = {
    fontFamily: "Noto Sans",
    fontStyle: "normal",

    fontSize: "30px",
    lineHeight: "30px",
    color: "black",
  };

  return (
    <>
      <Flex direction="column" style={{ ...commonStyle }}>
        <Flex justify="space-between" style={{ marginBottom: "30px" }}>
          <Box>
            <Stack>
              <Text style={{ fontWeight: "700" }}>작성 날짜 </Text>
              <Text>{selected.createdAt}</Text>
            </Stack>
          </Box>
          <Box>
            <Stack>
              <Text style={{ fontWeight: "700" }}>작성 고객</Text>
              <Text>{selected.customerName}</Text>
            </Stack>
          </Box>
        </Flex>

        <Box
          style={{
            width: "auto",
            minHeight: "250px",
            padding: "10px",
            border: "solid black",
            borderRadius: "5px",
            marginBottom: "30px",
          }}
        >
          {selected.content}{" "}
        </Box>

        <Box style={{ marginBottom: "30px" }}>
          <Stack>
            <Text style={{ fontWeight: "700" }}>고객 전화번호</Text>
            <Text>{selected.telephone}</Text>
          </Stack>
        </Box>

        <Box style={{ marginBottom: "30px" }}>
          <Stack>
            <Text style={{ fontWeight: "700" }}>처리 완료 여부</Text>
            <Text>{selected.replyYN === "Y" ? "완료" : "미완료"}</Text>
          </Stack>
        </Box>

        {selected.replyYN === "Y" ? (
          <>
            <Box style={{ marginBottom: "30px" }}>
              <Stack>
                <Text style={{ fontWeight: "700" }}>처리 날짜</Text>
                <Text>{selected.updatedAt}</Text>
              </Stack>
            </Box>

            <Box style={{ marginBottom: "30px" }}>
              <Stack>
                <Text style={{ fontWeight: "700" }}>처리 담당자</Text>
                <Text>{selected.banker.bankerName}</Text>
              </Stack>
            </Box>
          </>
        ) : null}
      </Flex>
      <Flex justify="end">
        <Button
          colorScheme="blue"
          mr={3}
          onClick={onClose}
          style={{ marginBottom: "30px" }}
        >
          닫기
        </Button>
      </Flex>
    </>
  );
};

export default BoardDetail;
