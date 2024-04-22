import CustomModal from "../../../components/Modal";
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
}) => {
  const options = ["예", "아니오"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "동의여부",

    onChange: console.log,
  });

  const group = getRootProps();
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
                    <Td>시니어플러스 우리예금</Td>
                  </Tr>
                  <Tr>
                    <Td>금액</Td>
                    <Td>100,000,000</Td>
                  </Tr>
                  <Tr>
                    <Td>가입기간</Td>
                    <Td>12개월</Td>
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
