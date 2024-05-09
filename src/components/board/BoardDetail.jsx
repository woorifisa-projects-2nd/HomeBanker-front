import React from "react";
import {
  Flex,
  Box,
  Button,
  Spacer,
  Text,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { formatPhoneNumber } from "../../util/counsel";

const BoardDetail = ({ selected, onClose }) => {
  // 공통으로 사용할 스타일 객체 정의
  const commonStyle = {
    fontFamily: "Noto Sans",
    fontStyle: "normal",

    fontSize: "26px",
    // lineHeight: "30px",
    color: "black",
  };

  return (
    <Box mt={4} mb={4} ml={14} mr={14}>
      <Flex direction="column" style={{ ...commonStyle }}>
        <Stack spacing={2}>
          <HStack>
            <Text style={{ fontWeight: "700" }}>작성 날짜 : </Text>
            <Text>{selected.createdAt.substr(0, 10)}</Text>
          </HStack>

          <HStack>
            <Text style={{ fontWeight: "700" }}>작성 고객 :</Text>
            <Text>{selected.customerName}</Text>
          </HStack>

          <HStack>
            <Text style={{ fontWeight: "700" }}>고객 전화번호 : </Text>
            <Text>{formatPhoneNumber(selected.telephone)}</Text>
          </HStack>

          <HStack>
            <Text style={{ fontWeight: "700" }}>처리 완료 여부 : </Text>
            <Text>{selected.replyYN === "Y" ? "완료" : "미완료"}</Text>
          </HStack>

          {selected.replyYN === "Y" ? (
            <>
              <HStack>
                <Text style={{ fontWeight: "700" }}>처리 날짜 : </Text>
                <Text>{selected.updatedAt.substr(0, 10)}</Text>
              </HStack>
              <HStack>
                <Text style={{ fontWeight: "700" }}>처리 담당자 : </Text>
                <Text>{selected.banker.bankerName}</Text>
              </HStack>
            </>
          ) : null}
          <Box
            style={{
              width: "auto",
              minHeight: "250px",
              padding: "10px",
              border: "solid black",
              borderRadius: "5px",
            }}
          >
            {selected.content}{" "}
          </Box>
        </Stack>
      </Flex>
      <Flex justify="end">
        <Button
          bg="#3686DF"
          color="white"
          mr={3}
          mt={12}
          pl={6}
          pr={6}
          pt={8}
          pb={8}
          fontSize={"30px"}
          onClick={onClose}
          style={{ marginBottom: "30px" }}
          _hover={{
            textDecor: "underline",
            textDecorationThickness: "2px",
            textUnderlineOffset: "8px",
          }}
        >
          닫기
        </Button>
      </Flex>
    </Box>
  );
};

export default BoardDetail;
