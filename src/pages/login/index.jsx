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

      const response = await axios.post(
        "http://localhost:8080/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const token = response.headers.authorization.split(" ")[1];
      console.log(response.headers);

      if (token) {
        const expirationDate = new Date();

        expirationDate.setDate(expirationDate.getDate() + 1); // 1일 후 만료
        document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        console.log("로그인 성공!", `${document.cookie}`);
        navigate("/");
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
