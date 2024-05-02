import React, { useState, useEffect } from "react";
import { api } from "../../api/api";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Image,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import DaumPostcode from "react-daum-postcode";
import logo from "../../assets/icon/logoLogin.svg";

export default function ProfileTab() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    joinDate: "",
    phone: "",
    address: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

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
    setUserInfo({ ...userInfo, address: fullAddress });
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

  const formattedJoinDate = userInfo.joinDate
    ? new Date(userInfo.joinDate).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get(`/api/mypage/profile`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("사용자 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdateAll = async () => {
    try {
      const response = await api.post(`/api/mypage/profile`, userInfo);
      if (response.status !== 200) {
        console.error("사용자 정보 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("사용자 정보 업데이트에 실패했습니다.", error);
    }
  };

  const handleChange = (field, value) => {
    setUserInfo((prevState) => ({ ...prevState, [field]: value }));
  };

  const commonCellStyle = {
    fontFamily: "Noto Sans",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: "40px",
    color: "#575757",
  };

  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <VStack spacing={4}>
        <Image src={logo} alt="logo" marginBottom="30px" marginTop="100px" />
        <Flex as={FormControl} alignItems="center" gap="4" marginBottom="20px">
          <FormLabel htmlFor="name" mb="0" w="100px" sx={commonCellStyle}>
            이름
          </FormLabel>
          <Text id="name" w="800px" sx={commonCellStyle}>
            {userInfo.name}
          </Text>
        </Flex>
        <Flex as={FormControl} alignItems="center" gap="4" marginBottom="20px">
          <FormLabel mb="0" w="100px" sx={commonCellStyle}>
            가입일
          </FormLabel>
          <Text w="800px" sx={commonCellStyle}>
            {formattedJoinDate}
          </Text>
        </Flex>
        <Flex as={FormControl} alignItems="center" gap="4" marginBottom="20px">
          <FormLabel htmlFor="phone" mb="0" w="100px" sx={commonCellStyle}>
            전화번호
          </FormLabel>
          <Input
            id="phone"
            value={userInfo.phone}
            w="800px"
            sx={commonCellStyle}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </Flex>
        <Flex as={FormControl} alignItems="center" gap="4" marginBottom="20px">
          <FormLabel htmlFor="address" mb="0" w="115px" sx={commonCellStyle}>
            주소
          </FormLabel>
          <InputGroup>
            <Input
              id="address"
              value={userInfo.address}
              w="800px"
              sx={commonCellStyle}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <InputRightElement width="4.5rem" marginRight="30px" height="100%">
              <Button h="1.75rem" size="sm" onClick={onOpen}>
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
        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleUpdateAll}
          style={{ background: "#3686DF", width: "800px", fontSize: "30px" }}
        >
          편집하기
        </Button>
      </VStack>
    </Flex>
  );
}
