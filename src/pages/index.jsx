import React from "react";
import { Button, Stack, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export default function Index() {
  const navigate = useNavigate();

  const handleBoardClick = () => {
    const token = document.cookie.split("=")[1];

    if (token) {
      const user = jwtDecode(token);

      if (user.role === "ROLE_ADMIN") {
        navigate("/board");
      } else {
        alert("권한이 없습니다.");
      }
    } else {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
  };

  const handleLogout = () => {

    // 쿠키의 만료시간을 현재보다 이전 시간으로 설정하여 삭제 처리
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    alert("로그아웃 되었습니다.");

    navigate("/login");
  };

  // 쿠키에 토큰이 있는지 확인하여 로그인 상태를 판별
  const isLoggedIn = document.cookie.includes("token");

  return (
    <>
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
        {isLoggedIn && (
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
