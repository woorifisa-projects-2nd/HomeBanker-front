import React, { useState } from "react";
import { Button, Stack, Flex, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
import { api } from "../api/api";
import Header from "../components/Header";
import useLogout from "../hook/useLogout";
import { useAuth } from "../api/counsel/api.js";
import useCheckRole from "../hook/useCheckRole";

export default function Index() {
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const { data: user, isError } = useAuth();

  const handleBoardClick = async () => {
    if (user) {
      if (user.role === "ROLE_ADMIN") {
        navigate("/board/admin");
      } else {
        navigate("/board");
      }
    } else {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
  };

  const handleCounselClick = (counselType) => {
    if (user) {
      let storageValue;
      switch (counselType) {
        case "예/적금 상담":
          storageValue = "deposit";
          break;
        case "카드 상담":
          storageValue = "card";
          break;
        case "대출 상담":
          storageValue = "loan";
          break;
        default:
          storageValue = "all";
          break;
      }

      if (user.role === "ROLE_CUSTOMER") {
        localStorage.setItem("counselType", storageValue);
        navigate("/counsel");
      } else {
        localStorage.removeItem("counselType");
        navigate("/counsel");
      }
    } else {
      alert("로그인이 필요한 기능입니다");
      navigate("/login");
    }
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
          fontFamily: "WooriDaumR",
        }}
      >
        <Flex direction="column" alignItems="baseline">
          <Text fontSize="5xl" color="#0083CA">
            우리집은행 화상상담 창구
            <span class="blind">우리집은행 화상상담 창구</span>
          </Text>
          <Spacer />
          <Stack spacing={8} direction="row" align="center" margin="30px">
            <Button
              height="10rem"
              width="30rem"
              color="#F1F1F1"
              onClick={() => handleCounselClick("예/적금 상담")}
            >
              <div style={{ width: "25rem", height: "5rem" }}>
                <Text
                  style={{ float: "left", marginBottom: "15px" }}
                  fontSize="3xl"
                  color="black"
                >
                  예/적금 상담
                  <span class="blind">예/적금 상담</span>
                </Text>

                <Text style={{ float: "left" }} color="#909090" fontSize="lg">
                  화상 상담을 통해 예/적금 상품을 가입할 수 있습니다
                  <span class="blind">
                    화상 상담을 통해 예/적금 상품을 가입할 수 있습니다
                  </span>
                </Text>
              </div>
            </Button>
            <Button
              height="10rem"
              width="30rem"
              color="#F1F1F1"
              onClick={() => handleCounselClick("카드 상담")}
            >
              <div style={{ width: "25rem", height: "5rem" }}>
                <Text
                  style={{ float: "left", marginBottom: "15px" }}
                  fontSize="3xl"
                  color="black"
                >
                  카드 상담
                  <span class="blind">카드 상담</span>
                </Text>

                <Text style={{ float: "left" }} color="#909090" fontSize="lg">
                  화상 상담을 통해 카드 상품을 가입할 수 있습니다
                  <span class="blind">
                    화상 상담을 통해 카드 상품을 가입할 수 있습니다
                  </span>
                </Text>
              </div>
            </Button>
          </Stack>
          <Stack spacing={8} direction="row" align="center">
            <Button
              height="10rem"
              width="30rem"
              color="#F1F1F1"
              onClick={() => handleCounselClick("대출 상담")}
            >
              <div style={{ width: "25rem", height: "5rem" }}>
                <Text
                  style={{ float: "left", marginBottom: "15px" }}
                  fontSize="3xl"
                  color="black"
                >
                  대출 상담
                  <span class="blind">대출 상담</span>
                </Text>

                <Text style={{ float: "left" }} color="#909090" fontSize="lg">
                  화상 상담을 통해 대출 상품을 가입할 수 있습니다
                  <span class="blind">
                    화상 상담을 통해 대출 상품을 가입할 수 있습니다
                  </span>
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
                  <span class="blind">문의 게시판</span>
                </Text>

                <Text style={{ float: "left" }} color="#909090" fontSize="lg">
                  문의 글을 작성할 수 있습니다
                  <span class="blind">문의 글을 작성할 수 있습니다</span>
                </Text>
              </Flex>
            </Button>
          </Stack>
        </Flex>
      </div>
    </>
  );
}
