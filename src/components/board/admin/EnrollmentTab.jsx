import React, { useContext, useState } from "react";
import { Box, Input, Text, Button } from "@chakra-ui/react";
import { TransferContext } from "./TransferTab";
import useCheckRole from "../../../hook/useCheckRole";
import { ModalList } from "../../counsel/modal/ModalList";
import useCheckId from "../../../hook/useCheckId";
import { ModalContext } from "../../counsel/modal/ModalProvider";

const EnrollmentTab = ({
  session,
  user,
  productName,
  productId,
  modalAmount,
  ModalPeriod,

  // isModalDisplayed,
}) => {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [bankerId, setBankerId] = useState("banker1");

  const { selectedProduct } = useContext(TransferContext);

  const { state, actions } = useContext(ModalContext);
  const { isModalDisplayed } = state;
  const { setIsModalDisplayed } = actions;

  if (useCheckRole() == "ROLE_ADMIN") setBankerId(useCheckId().loginId);

  const handleAmountChange = (value) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    const formattedValue = (+cleanValue).toLocaleString();
    setAmount(formattedValue);
  };

  const handleSend = async () => {
    if (!selectedProduct || !amount || !period) {
      console.error("데이터 전송 실패: 필수 정보가 누락되었습니다.");
      return;
    } else if (selectedProduct && amount && period) {
      setIsModalDisplayed(true);
    }

    const numericAmount = +amount.replace(/,/g, "");
    const numericPeriod = +period;

    const transferData = {
      product: selectedProduct,
      amount: numericAmount,
      period: numericPeriod,
      bankerId: bankerId,
    };

    const jsonString = JSON.stringify(transferData);

    if (session && user) {
      // 상품 가입 정보 송신
      user.stream.session
        .signal({
          data: jsonString,
          to: [],
          type: "enrollment",
        })
        .then(() => {
          console.log("상품 가입 데이터 전송 완료");
        })
        .catch((error) => {
          console.error("상품 가입 데이터 전송 실패", error);
        });
    }

    // 상품 가입 정보 수신
    // user.stream.session.on("signal:enrollment", (e) => {
    //   const receivedData = JSON.parse(e.data);
    //   console.log("전달받은 데이터 :", receivedData);
    // });
  };

  //모달
  // const [modalMODE, setModalMODE] = useState("F");

  // const changeMode = () => {
  //   if (modalMODE === "F") setModalMODE("S");
  //   else if (modalMODE === "S") setModalMODE("T");
  //   else if (modalMODE === "T") {
  //     setIsModalDisplayed(false);
  //     setModalMODE("F");
  //   }
  // };

  return (
    <>
      <Box
        mt={4}
        p={4}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        width="100%"
      >
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
      {isModalDisplayed && (
        <ModalList
          // MODE={modalMODE}
          // isOpen={isModalDisplayed}
          onClose={() => {
            setIsModalDisplayed(true);
          }}
          size={"xl"}
          successMessage={"다음"}
          // successAction={changeMode}
          productName={productName}
          productId={productId}
          amount={modalAmount}
          period={ModalPeriod}
          bankerId={bankerId}
        ></ModalList>
      )}
    </>
  );
};

export default EnrollmentTab;
