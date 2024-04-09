import React, {useState, useEffect} from "react";
import axios from 'axios';
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Login() {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleId = (e) => {
    setId(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        id: id,
        password: password
      });
      console.log("로그인 성공!", response.data);
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
          id="email"
          placeholder="아이디를 입력하세요"
          type="email"
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
};