import CustomModal from "../../Modal";
import { ModalContext } from "./ModalProvider";
import useCheckRole from "../../../hook/useCheckRole";
import {
  Text,
  Stack,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useContext } from "react";
// import RadioCard from "../../../components/RadioCard";

export const FModal = ({
  isOpen,
  onClose,
  children,
  size,
  successMessage,
  successAction,
  productName,
  productDescription,
  amount,
  period,
  session,
  user,
}) => {
  const { role } = useCheckRole();
  const { state, setMode } = useContext(ModalContext);
  const { isModalDisplayed } = state;
  const { setModalMODE } = setMode;

  const buttonAction = () => {
    if (role === "ROLE_CUSTOMER") setModalMODE("S");

    const transferData = {
      nextModal: "S",
    };

    const jsonString = JSON.stringify(transferData);

    if (session && user) {
      // 상품 가입 정보 송신
      user.stream.session
        .signal({
          data: jsonString,
          to: [],
          type: "register",
        })
        .then(() => {
          console.log("다음 모달 S로 이동 완료");
        })
        .catch((error) => {
          console.error("다음 모달 S로 이동 불가", error);
        });
    }
  };

  //만원 단위의 원화로 출력
  const numberToKoreanMoney = (number) => {
    const unitWords = ["원", "만 ", "억 ", "조 ", "경 "];
    const unit = 10000;
    let splitCount = unitWords.length;
    let resultArray = [];
    let resultString = "";

    for (var i = 0; i < splitCount; i++) {
      var unitResult = (number % Math.pow(unit, i + 1)) / Math.pow(unit, i);
      unitResult = Math.floor(unitResult);
      if (unitResult > 0) {
        resultArray[i] = unitResult;
      }
    }

    for (var i = 0; i < resultArray.length; i++) {
      if (!resultArray[i]) continue;
      resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }
    return resultString;
  };

  return (
    <>
      <CustomModal
        isOpen={isModalDisplayed}
        onClose={onClose}
        title={"고객 신청사항"}
        size={size}
        successMessage={successMessage}
        successAction={() => {
          if (role === "ROLE_CUSTOMER") buttonAction();
        }}
        children={
          <>
            <ModalCloseButton />
            <TableContainer>
              <Table variant="simple" size="lg">
                <Tbody>
                  <Tr>
                    <Td>상품명</Td>
                    <Td>{productName}</Td>
                  </Tr>
                  <Tr>
                    <Td>상품 설명</Td>
                    <Td>{productDescription}</Td>
                  </Tr>
                  <Tr>
                    <Td>금액</Td>
                    <Td>{numberToKoreanMoney(amount)}</Td>
                  </Tr>
                  <Tr>
                    <Td>가입기간</Td>
                    <Td>{period}개월</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Text fontSize="2xl">※ 위의 신청내용을 확인합니다. </Text>
            </Stack>
          </>
        }
      ></CustomModal>
    </>
  );
};
