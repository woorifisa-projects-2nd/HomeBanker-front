import React from "react";
import { Flex, Text, Button, Stack } from "@chakra-ui/react";

const Notice = ({ joinSession }) => {
  return (
    <div
      style={{
        width: "60rem",
        backgroundColor: "white",
        border: "#3686DF solid 4px",
        padding: "50px",
        borderRadius: "28px",
        fontSize: "28px",
        color: "black",
        fontFamily: "WooriDaum",
      }}
    >
      <Stack>
        <Flex direction="column" align="center">
          <Text>우리집은행 화상 상담 내용은 기록 및 저장됩니다.</Text>
          <div style={{ width: "auto", height: "15px" }}></div>
          <Text>
            기록된 상담 내용은 향후 더 나은 서비스를 위한 용도로 사용됩니다.
          </Text>

          <div style={{ width: "auto", height: "80px" }}></div>
          <Text>
            상기 본인은 위의 내용을 이해하였으며 상담 내용의 기록 및 저장에
            동의합니다.
          </Text>
          <div style={{ height: "50px" }}></div>
          <Button
            size="lg"
            onClick={joinSession}
            style={{
              width: "300px",
              height: "80px",
              fontSize: "28px",
              fontFamily: "WooriDaumR",
            }}
          >
            화상 상담 시작
          </Button>
        </Flex>
      </Stack>
    </div>
  );
};

export default Notice;
