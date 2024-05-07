import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Flex,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { api } from "../../api/api";
import DaumPostcode from "react-daum-postcode";
import logoLogin from "../../assets/icon/logoLogin.svg";

function SignupPage() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    birth: "",
    phone: "",
    address: "",
    loginId: "",
    loginPw: "",
    confirmPassword: "",
    identificationNum: "",
  });

  const commonCellStyle = {
    fontFamily: "WooriDaumR",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: "40px",
    color: "#575757",
  };

  const handleAddress = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setFormData({ ...formData, address: fullAddress });
    onClose();
  };

  const addressInput = () => {
    const themeObj = {
      postcodeTextColor: "#FA7142",
      emphTextColor: "#333333",
    };
    return (
      <div>
        <DaumPostcode theme={themeObj} />
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    if (name === "loginPw" && !passwordRegex.test(value)) {
      setPasswordErrorMessage(
        "비밀번호는 최소 8자 이상이어야 하며, 영문자, 숫자, 특수문자가 모두 포함되어야 합니다."
      );
    } else {
      setPasswordErrorMessage("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;

    if (value !== formData.loginPw) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMatchError("");
    }

    setFormData((prevState) => ({
      ...prevState,
      confirmPassword: value,
    }));
  };

  const handleIdentificationNumChange = (e) => {
    const value = e.target.value;
    let formattedValue = value;

    if (
      value.length === formData.identificationNum.length - 1 &&
      value.endsWith("-")
    ) {
      formattedValue = value.slice(0, -1);
    }

    if (value.length === 6 && !value.includes("-")) {
      formattedValue += "-";
    }

    if (formattedValue.length > 14) {
      formattedValue = formattedValue.slice(0, 14);
    }

    setFormData((prevState) => ({
      ...prevState,
      identificationNum: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (key !== "address" && formData[key].trim() === "") {
        alert("모든 항목을 입력해주세요.");
        return;
      }
    }

    if (formData.loginPw !== formData.confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (formData.identificationNum.length !== 14) {
      alert("주민등록번호를 다시 입력해주세요.");
      return;
    }

    try {
      const response = await api.post("/register", formData);
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="calc(100vh - 130px)"
        marginTop="30px"
      >
        <img src={logoLogin} alt="NoImage" />
        <Text color="red" sx={{ marginLeft: "780px", fontSize: "28px" }}>
          * 표시는 필수 입력 사항입니다.
        </Text>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          marginTop="30px"
        >
          <Box as="form" onSubmit={handleSubmit} p={4}>
            <VStack spacing={4}>
              <Flex
                as={FormControl}
                alignItems="center"
                gap="4"
                marginBottom="20px"
              >
                <FormLabel htmlFor="name" mb="0" w="245px" sx={commonCellStyle}>
                  * 이름
                </FormLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  sx={commonCellStyle}
                  onChange={handleChange}
                />
              </Flex>
              <Flex
                as={FormControl}
                alignItems="center"
                gap="4"
                marginBottom="20px"
              >
                <FormLabel
                  htmlFor="birth"
                  mb="0"
                  w="245px"
                  sx={commonCellStyle}
                >
                  * 생년월일
                </FormLabel>
                <Input
                  type="date"
                  id="birth"
                  name="birth"
                  value={formData.birth}
                  max={new Date().toISOString().split("T")[0]}
                  sx={commonCellStyle}
                  onChange={handleChange}
                />
              </Flex>
              <Flex
                as={FormControl}
                alignItems="center"
                gap="4"
                marginBottom="20px"
              >
                <FormLabel
                  htmlFor="phone"
                  mb="0"
                  w="245px"
                  sx={commonCellStyle}
                >
                  * 전화번호
                </FormLabel>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  sx={commonCellStyle}
                  onChange={handleChange}
                />
              </Flex>
              <Flex
                as={FormControl}
                alignItems="center"
                gap="4"
                marginBottom="20px"
              >
                <FormLabel
                  htmlFor="address"
                  mb="0"
                  w="245px"
                  sx={commonCellStyle}
                >
                  주소
                </FormLabel>
                <InputGroup>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    w="900px"
                    sx={commonCellStyle}
                    onChange={(e) =>
                      handleChange({
                        target: { name: "address", value: e.target.value },
                      })
                    }
                  />
                  <InputRightElement width="100px" marginRight="41px">
                    <Button size="sm" onClick={onOpen}>
                      주소찾기
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>주소 검색</ModalHeader>
                  <ModalCloseButton />
                  <DaumPostcode onComplete={handleAddress} />
                </ModalContent>
              </Modal>

              <Flex
                as={FormControl}
                alignItems="center"
                gap="4"
                marginBottom="20px"
              >
                <FormLabel
                  htmlFor="loginId"
                  mb="0"
                  w="245px"
                  sx={commonCellStyle}
                >
                  * 아이디
                </FormLabel>
                <Input
                  type="text"
                  id="loginId"
                  name="loginId"
                  value={formData.loginId}
                  sx={commonCellStyle}
                  onChange={handleChange}
                />
              </Flex>
              <Flex
                as={FormControl}
                alignItems="center"
                gap="4"
                marginBottom="20px"
              >
                <FormLabel
                  htmlFor="loginPw"
                  mb="0"
                  w="245px"
                  sx={commonCellStyle}
                >
                  * 패스워드
                </FormLabel>
                <Input
                  type="password"
                  name="loginPw"
                  value={formData.loginPw}
                  sx={commonCellStyle}
                  onChange={handlePasswordChange}
                />
              </Flex>
              {passwordErrorMessage && (
                <Text color="red" sx={{ marginRight: "100px" }}>
                  {passwordErrorMessage}
                </Text>
              )}

              <Flex
                as={FormControl}
                alignItems="center"
                gap="4"
                marginBottom="20px"
              >
                <FormLabel
                  htmlFor="confirmPassword"
                  mb="0"
                  w="245px"
                  sx={commonCellStyle}
                >
                  * 패스워드 확인
                </FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  sx={commonCellStyle}
                  onChange={handleConfirmPasswordChange}
                />
              </Flex>
              {passwordMatchError && (
                <Text color="red" sx={{ marginRight: "490px" }}>
                  {passwordMatchError}
                </Text>
              )}

              <Flex
                as={FormControl}
                alignItems="center"
                gap="4"
                marginBottom="20px"
              >
                <FormLabel
                  htmlFor="identificationNum"
                  mb="0"
                  w="245px"
                  sx={commonCellStyle}
                >
                  * 주민등록번호
                </FormLabel>
                <Input
                  type="text"
                  id="identificationNum"
                  name="identificationNum"
                  value={formData.identificationNum}
                  sx={commonCellStyle}
                  onChange={handleIdentificationNumChange}
                />
              </Flex>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                mt={4}
                style={{
                  ...commonCellStyle,
                  color: "white",
                }}
              >
                회원가입
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default SignupPage;
