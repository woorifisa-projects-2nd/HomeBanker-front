import React, { useState } from "react";
import { Button, Stack, Flex } from "@chakra-ui/react";
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

  return (
    <>
      <Header />
      <Flex direction="column" alignItems="center">
        <h2>원하시는 업무를 선택해주세요.</h2>
        <Stack spacing={8} direction="row" align="center" margin="30px">
          <Button size="md" height="48px" width="200px" border="2px" borderColor="green.500">
            예/적금 업무
          </Button>
          <Button size="md" height="48px" width="200px" border="2px" borderColor="green.500">
            카드 업무
          </Button>
        </Stack>
        <Stack spacing={8} direction="row" align="center">
          <Button size="md" height="48px" width="200px" border="2px" borderColor="green.500">
            대출 업무
          </Button>
          <Button size="md" height="48px" width="200px" border="2px" borderColor="green.500" onClick={handleBoardClick}>
            고객상담 게시판
          </Button>
        </Stack>
        {user && (
          <Button
            mt={4}
            size="sm"
            height="32px"
            width="120px"
            border="2px"
            borderColor="red.500"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        )}
      </Flex>
    </>
  );
}
