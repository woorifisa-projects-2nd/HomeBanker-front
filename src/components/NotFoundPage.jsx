import Header from "./Header.jsx";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HiExclamationTriangle } from "react-icons/hi2";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Flex direction="column" align="center">
          <HiExclamationTriangle
            style={{ height: "250px", width: "300px", color: "#0083CA" }}
          />
          <Text fontSize="5xl" fontFamily="WooriDaumR">
            찾으시는 페이지가 없습니다.
          </Text>
          <Button
            onClick={() => navigate("/")}
            style={{ margin: "30px", width: "200px", height: "70px" }}
          >
            <Text fontSize="2xl" fontFamily="WooriDaumL">
              홈으로 가기
            </Text>
          </Button>
        </Flex>
      </div>
    </>
  );
}
