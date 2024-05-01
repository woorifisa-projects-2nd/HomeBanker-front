import CustomModal from "../../Modal";
import { ModalContext } from "./ModalProvider";
import useCheckRole from "../../../hook/useCheckRole";
import {
  Text,
  Stack,
  useRadioGroup,
  HStack,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useContext } from "react";
// import RadioCard from "../../../components/RadioCard";

export const SModal = ({
  isOpen,
  onClose,
  children,
  size,
  title,
  successMessage,
  successAction,
  productName,
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
    if (role === "ROLE_CUSTOMER") setModalMODE("T");

    const transferData = {
      nextModal: "T",
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
          console.log("다음 모달 T로 이동 완료");
        })
        .catch((error) => {
          console.error("다음 모달 T로 이동 불가", error);
        });
    }
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
            <TableContainer>
              <Table variant="simple" size="lg">
                <Tbody>
                  <Tr>
                    <Td>상품명</Td>
                    <Td>{productName}</Td>
                  </Tr>
                  <Tr>
                    <Td>금액</Td>
                    <Td>{amount}</Td>
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
