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
import { api } from "../../api/api";

export default function Login() {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const navigate = useNavigate();

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

      const response = await api.post("/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const token = response.headers.authorization.split(" ")[1];

      if (token) {
        const expirationDate = new Date();

        expirationDate.setDate(expirationDate.getDate() + 1); // 1일 후 만료
        document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;

        navigate("/");
      }
    } catch (error) {
      alert("아이디나 비밀번호가 틀렸습니다. 다시 시도해 주세요.");
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
