import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  useColorModeValue,
  Text,
  VStack,
} from "@chakra-ui/react";
import { api } from "../../api/api";
import Header from "../../components/Header";
import logoLogin from "../../assets/icon/logoLogin.svg";
import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";

export default function Login() {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

  const loginText = {
    fontFamily: "Noto Sans",
    fontStyle: "normal",
    fontWeight: "600",
    color: "#A9A9A9",
    width: "157.8px",
    fontSize: "20px",
    lineHeight: "20px",
  };

  return (
    <>
      <Header />
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="calc(100vh - 130px)"
      >
        <img src={logoLogin} alt="NoImage" />
        <Text
          style={{
            fontFamily: "Noto Sans",
            fontStyle: "normal",
            fontWeight: "600",
            width: "600px",
            height: "48px",
            fontSize: "40px",
            lineHeight: "40px",
            textAlign: "center",
            marginBottom: "37px",
            marginTop: "20px",
          }}
        >
          집에서 만나는 금융상담 서비스
        </Text>
        <VStack spacing={4} align="flex-start" w="800px">
          <Text style={{ ...loginText, fontSize: "24px" }}>아이디</Text>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none" fontSize="28px" h="100%">
              <MdOutlineEmail color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="아이디를 입력하세요"
              onChange={handleId}
              fontSize="28px"
              h="61.91px"
            />
          </InputGroup>
        </VStack>
        <VStack spacing={4} align="flex-start" w="800px">
          <Text style={{ ...loginText, fontSize: "24px", marginTop: "20px" }}>
            비밀번호
          </Text>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none" fontSize="28px" h="100%">
              <IoKeyOutline color="gray.300" />
            </InputLeftElement>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              onChange={handlePassword}
              fontSize="28px"
              h="61.91px"
            />
            <InputRightElement
              width="4.5rem"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="unstyled"
                fontSize="28px"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
        <Button
          colorScheme="teal"
          mb={8}
          onClick={handleLogin}
          style={{
            width: "800px",
            height: "61.91px",
            background: "#3686DF",
            borderRadius: "6px",
            fontSize: "30px",
            marginTop: "30px",
          }}
        >
          로그인하기
        </Button>
        <Button
          colorScheme="blue"
          variant="link"
          onClick={() => navigate("/register")}
          style={{ ...loginText, marginBottom: "20px" }}
        >
          회원가입하시겠어요?
        </Button>
      </Flex>
    </>
  );
}
