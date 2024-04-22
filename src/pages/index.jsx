import React, { useState } from "react";
import { Button, Stack, Flex, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
import { api } from "../api/api";
import Header from "../components/Header";
import useLogout from "../hook/useLogout";
import { useAuth } from "../api/counsel/api.js";

export default function Index() {
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const { data: user, isError } = useAuth();

  const handleBoardClick = async () => {
    if (user) {
      if (user.role === "ROLE_ADMIN" || user.role === "ROLE_BANKER") {
        navigate("/board/admin");
      } else {
        navigate("/board");
      }
    } else {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
  };

  const handleCounselClick = () => {
    navigate("/counsel");
  };

  return (
    <>
      <Header />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "WooriDaum",
        }}
      >
        <Flex direction="column" alignItems="baseline">
          <Text fontSize="5xl" color="#0083CA">
            우리집은행 화상상담 창구
          </Text>
          <Spacer />
          <Stack spacing={8} direction="row" align="center" margin="30px">
            <Button
              height="10rem"
              width="30rem"
              color="#F1F1F1"
              onClick={handleCounselClick}
            >
              <div style={{ width: "25rem", height: "5rem" }}>
                <Text
                  style={{ float: "left", marginBottom: "15px" }}
                  fontSize="3xl"
                  color="black"
                >
                  예/적금 상담
                </Text>

                <Text style={{ float: "left" }} color="#909090" fontSize="lg">
                  화상 상담을 통해 예/적금 상품을 가입할 수 있습니다
                </Text>
              </div>
            </Button>
            <Button
              height="10rem"
              width="30rem"
              color="#F1F1F1"
              onClick={handleCounselClick}
            >
              <div style={{ width: "25rem", height: "5rem" }}>
                <Text
                  style={{ float: "left", marginBottom: "15px" }}
                  fontSize="3xl"
                  color="black"
                >
                  카드 상담
                </Text>

                <Text style={{ float: "left" }} color="#909090" fontSize="lg">
                  화상 상담을 통해 카드 상품을 가입할 수 있습니다
                </Text>
              </div>
            </Button>
          </Stack>
          <Stack spacing={8} direction="row" align="center">
            <Button
              height="10rem"
              width="30rem"
              color="#F1F1F1"
              onClick={handleCounselClick}
            >
              <div style={{ width: "25rem", height: "5rem" }}>
                <Text
                  style={{ float: "left", marginBottom: "15px" }}
                  fontSize="3xl"
                  color="black"
                >
                  대출 상담
                </Text>

                <Text style={{ float: "left" }} color="#909090" fontSize="lg">
                  화상 상담을 통해 대출 상품을 가입할 수 있습니다
                </Text>
              </div>
            </Button>
            <Button
              height="10rem"
              width="30rem"
              color="#F1F1F1"
              onClick={handleBoardClick}
            >
              <Flex
                direction="column"
                align="baseline"
                style={{ width: "25rem", height: "5rem" }}
              >
                <Text
                  style={{ float: "left", marginBottom: "15px" }}
                  fontSize="3xl"
                  color="black"
                >
                  문의 게시판
                </Text>

                <Text style={{ float: "left" }} color="#909090" fontSize="lg">
                  문의 글을 작성할 수 있습니다
                </Text>
              </Flex>
            </Button>
          </Stack>
        </Flex>
      </div>
    </>
  );
}
