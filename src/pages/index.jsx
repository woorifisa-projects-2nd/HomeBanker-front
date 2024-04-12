import { Button, Stack, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export default function Index() {
  const navigate = useNavigate();

  const handleBoardClick = () => {
    const token = document.cookie.split("=")[2]; // 쿠키에서 토큰 추출
    console.log(token);
    const user = jwtDecode(token); // 토큰을 디코딩하여 사용자 정보 추출
    console.log(token);
    // 사용자 역할이 관리자인 경우에만 게시판으로 이동
    if (user.role === "ROLE_ADMIN") {
      navigate("/board");
    } else {
      console.log("권한이 없습니다.");
    }
  };


  return (
    <>
      <Flex direction="column" alignItems="center">
        <h2>손님, 원하시는 업무를 선택해주세요.</h2>
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
      </Flex>
    </>
  );
}