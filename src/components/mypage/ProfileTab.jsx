import React, { useState, useEffect } from "react";
import { api } from "../../api/api";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Text,
} from "@chakra-ui/react";

export default function ProfileTab() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    joinDate: "",
    phone: "",
    address: "",
  });

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

  return (
    <div>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="name">이름</FormLabel>
          <Input
            id="name"
            value={userInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>가입일</FormLabel>
          <Text>{formattedJoinDate}</Text>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="phone">전화번호</FormLabel>
          <Input
            id="phone"
            value={userInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="address">주소</FormLabel>
          <Input
            id="address"
            value={userInfo.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" size="lg" onClick={handleUpdateAll}>
          확인
        </Button>
      </VStack>
    </div>
  );
}