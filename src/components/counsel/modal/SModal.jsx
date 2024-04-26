import CustomModal from "../../Modal";
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
  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={"고객 신청사항"}
        size={size}
        successMessage={successMessage}
        successAction={successAction}
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
              {/* <HStack {...group}>
                {options.map((value) => {
                  const radio = getRadioProps({ value });
                  return (
                    <RadioCard key={value} {...radio}>
                      {value}
                    </RadioCard>
                  );
                })}
              </HStack> */}
            </Stack>
          </>
        }
      ></CustomModal>
    </>
  );
};
