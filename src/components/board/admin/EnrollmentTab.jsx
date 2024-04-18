import React, { useContext, useState } from "react";
import { Box, Input, Text, Button } from "@chakra-ui/react";
import { TransferContext } from "./TransferTab";

const EnrollmentTab = () => {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");

  const { selectedProduct } = useContext(TransferContext);

  const handleAmountChange = (value) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    const formattedValue = (+cleanValue).toLocaleString();
    setAmount(formattedValue);
  };

  const handleSend = async () => {
    if (!selectedProduct || !amount || !period) {
      console.error("데이터 전송 실패: 필수 정보가 누락되었습니다.");

      return;
    }
  };

  // TODO: 웹 소켓으로 데이터 보내기

  // product: selectedProduct,
  // amount: +amount.replace(/,/g, ''), // 쉼표(,) 제거 후 숫자로 변환
  // period: +period, // 문자열을 숫자로 변환

  return (
    <Box mt={4} p={4} bg="white" borderRadius="md" boxShadow="lg" width="100%">
      <Text>상품 금액:</Text>
      <Input
        type="text"
        placeholder="상품 금액을 입력하세요"
        value={amount}
        onChange={(e) => handleAmountChange(e.target.value)}
        mt={2}
        mb={4}
      />
      <Text>가입 기간:</Text>
      <Input
        type="number"
        placeholder="가입 기간을 입력하세요"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        mt={2}
        mb={4}
      />
      <Button colorScheme="teal" onClick={handleSend}>
        전송
      </Button>
    </Box>
  );
};

export default EnrollmentTab;
