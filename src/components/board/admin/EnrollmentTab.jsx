import React, { useContext, useState } from "react";
import { Box, Input, Text, Button } from "@chakra-ui/react";
import { TransferContext } from "./TransferTab";

const EnrollmentTab = ( session, publisher ) => {
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

    // TODO:
    // if (publisher && role === )

  };

    // const numericAmount = +amount.replace(/,/g, '')
  // const numericPeriod = +period;

  // const transferData = {
  //   product: selectedProduct,
  //   amount: numericAmount,
  //   period: numericPeriod
  // }

  // const jsonString = JSON.stringify(transferData);

  // // 보내는 쪽
  // session.signal({
  //   data: jsonString,
  //   to: [],
  //   type: 'enrollment'
  // })
  // .then(() => {
  //     console.log('상품 가입 데이터 전송 완료');
  // })
  // .catch(error => {
  //     console.error('상품 가입 데이터 전송 실패', error);
  // });

  // // 받는 쪽
  // session.on('enrollment', (e) => {
  
  //   const receivedData = JSON.parse(e.data);
  //   console.log('전달받은 데이터 :', receivedData);

  // });

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
