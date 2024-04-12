import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { jwtDecode } from 'jwt-decode';


// 페이징 라우팅 전에 role 권한 확인하는 코드 짜기 

export default function Login() {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 객체 생성

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("loginId", id);
      formData.append("loginPw", password);

      const response = await axios.post(
        "http://localhost:8080/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization 헤더는 별도로 설정하지 않음
          },
        }
      );

      const token = response.headers.authorization.split(" ")[1];

      if (token) {
        // const user = jwtDecode(token);
        const expirationDate = new Date();

        expirationDate.setDate(expirationDate.getDate() + 1); // 7일 후 만료
        document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        console.log("로그인 성공!", token);
        navigate("/");

        // if(user.role === "ROLE_ADMIN") {
        //   navigate("/main");
        // } else {
        //   console.log("main page 권한 없음");
        // }
      }
    } catch (error) {
      console.error("로그인 실패!", error);
    }
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={20}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={8}>고객 로그인 페이지</Heading>
        <Input
          id="id"
          placeholder="아이디를 입력하세요"
          type="id"
          variant="filled"
          mb={3}
          onChange={handleId}
        />
        <Input
          id="password"
          placeholder="비밀번호를 입력하세요"
          type="password"
          variant="filled"
          mb={6}
          onChange={handlePassword}
        />
        <Button colorScheme="teal" mb={8} onClick={handleLogin}>
          로그인
        </Button>
      </Flex>
    </Flex>
  );
}
