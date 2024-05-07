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
      // 모달 송신
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
        title={
          <Text fontSize="4xl">
            고객 신청사항<span class="blind">고객 신청사항</span>
          </Text>
        }
        size={size}
        successMessage={successMessage}
        successAction={() => {
          if (role === "ROLE_CUSTOMER") buttonAction();
        }}
      >
        <>
          <Text fontSize="3xl">
            <ModalCloseButton />
            <TableContainer>
              <Table variant="simple" size="lg">
                <Tbody>
                  <Tr>
                    <Td>
                      상품명<span class="blind">상품명</span>
                    </Td>
                    <Td>
                      {productName}
                      <span class="blind">{productName}</span>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      상품 설명<span class="blind">상품 설명</span>
                    </Td>
                    <Td>
                      {productDescription}
                      <span class="blind">{productDescription}</span>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      금액<span class="blind">금액</span>
                    </Td>
                    <Td>
                      {numberToKoreanMoney(amount)}
                      <span class="blind">{numberToKoreanMoney(amount)}</span>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      가입기간<span class="blind">가입기간</span>
                    </Td>
                    <Td>
                      {period}개월<span class="blind">{period}개월</span>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Text>

          <Stack
            mt="60px"
            ml="10px"
            spacing={[1, 5]}
            direction={["column", "row"]}
          >
            <Text fontSize="4xl">
              ※ 위의 신청내용을 확인합니다.
              <span class="blind">※ 위의 신청내용을 확인합니다.</span>
            </Text>
          </Stack>
        </>
      </CustomModal>
    </>
  );
};
