import React from "react";
import { Flex, Stack, Text, Spacer } from "@chakra-ui/react";

const Exit = ({ time }) => {
  return (
    <>
      <div
        style={{
          zIndex: "999",
          width: "600px",
          height: "250px",
          backgroundColor: "white",
          border: "4px solid #3686DF",
          borderRadius: "28px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: "25px",
          fontFamily: "WooriDaumR",
        }}
      >
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Flex
            direction="column"
            align="center"
            style={{ width: "max-content" }}
          >
            <Text>
              {time}초후에 상담이 종료됩니다.
              <span class="blind">{time}초후에 상담이 종료됩니다.</span>
            </Text>
            <Spacer />
            <Text>
              우리집은행 화상상담을 이용해주셔서 감사합니다.{" "}
              <span class="blind">
                우리집은행 화상상담을 이용해주셔서 감사합니다.
              </span>
            </Text>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default Exit;
