import CustomModal from "../../Modal";
import { ModalContext } from "./ModalProvider";
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
}) => {
  const { state, setMode } = useContext(ModalContext);
  const { isModalDisplayed } = state;
  const { setModalMODE } = setMode;

  return (
    <>
      <CustomModal
        isOpen={isModalDisplayed}
        onClose={onClose}
        title={"고객 신청사항"}
        size={size}
        successMessage={successMessage}
        successAction={() => {
          setModalMODE("T");
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
