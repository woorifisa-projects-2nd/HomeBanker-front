import React, { useContext, useState } from "react";
import {
  Box,
  Input,
  Text,
  Button,
  Stack,
  Flex,
  HStack,
} from "@chakra-ui/react";
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
  productDescription,
  modalAmount,
  ModalPeriod,

  // isModalDisplayed,
}) => {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");

  const { selectedProduct } = useContext(TransferContext);

  const { state, actions, id, idAction } = useContext(ModalContext);
  const { isModalDisplayed } = state;
  const { setIsModalDisplayed } = actions;
  const { bankerId } = id;
  const { setBankerId } = idAction;

  const { loginId } = useCheckId();

  // if (useCheckRole() == "ROLE_ADMIN") setBankerId(useCheckId().loginId);

  const handleAmountChange = (value) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    const formattedValue = (+cleanValue).toLocaleString();
    setAmount(formattedValue);
  };

  const handleSend = async () => {
    setBankerId(loginId);
    // console.log("은행원-ID " + bankerId);
    if (!selectedProduct || !amount || !period) {
      console.error("데이터 전송 실패: 필수 정보가 누락되었습니다.");
      return;
    } else if (selectedProduct && amount && period) {
      setIsModalDisplayed(true);
    }
    // setBankerId(loginId);
    // console.log(" ---------------------->", bankerId);

    const numericAmount = +amount.replace(/,/g, "");
    const numericPeriod = +period;

    const transferData = {
      product: selectedProduct,
      amount: numericAmount,
      period: numericPeriod,
      bankerId: loginId,
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
      <Stack mt={8} paddingLeft={"14px"} paddingRight={"14px"}>
        <HStack spacing={2}>
          <Flex
            align="center"
            borderRadius={5}
            width={"30%"}
            textAlign="center"
          >
            <Text>금액</Text>
          </Flex>
          <Input
            width={"70%"}
            type="text"
            placeholder="금액을 입력하세요"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
          />
        </HStack>
        <HStack spacing={2}>
          <Flex
            align="center"
            borderRadius={5}
            width={"30%"}
            textAlign="center"
          >
            <Text>가입기간</Text>
          </Flex>
          <Input
            width={"70%"}
            type="number"
            placeholder="가입 기간을 입력하세요"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
        </HStack>
        <Button
          mt={4}
          isDisabled={!period || !amount}
          bgColor={!period || !amount ? "#CFCFCF" : "#3686DF"}
          onClick={handleSend}
        >
          <Text color={!period || !amount ? "black" : "white"}>전송</Text>
        </Button>
      </Stack>

      {isModalDisplayed && (
        <ModalList
          // MODE={modalMODE}
          // isOpen={isModalDisplayed}
          onClose={() => {
            setIsModalDisplayed(false);
          }}
          size={"xl"}
          successMessage={"다음"}
          // successAction={changeMode}
          productName={productName}
          productId={productId}
          productDescription={productDescription}
          amount={modalAmount}
          period={ModalPeriod}
          // bankerId={bankerId}
          session={session}
          user={user}
        ></ModalList>
      )}
    </>
  );
};

export default EnrollmentTab;
