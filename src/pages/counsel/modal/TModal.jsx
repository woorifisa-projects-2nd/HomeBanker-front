import CustomModal from "../../../components/Modal";
import {
  Text,
  Stack,
  useRadioGroup,
  HStack,
  List,
  ListItem,
  ListIcon,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
// import RadioCard from "../../../components/RadioCard";
import { TbSquareRoundedFilled } from "react-icons/tb";

export const TModal = ({
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
        title={"고객 확인"}
        size={size}
        successMessage={"완료"}
        successAction={onClose}
        children={
          <>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={TbSquareRoundedFilled} color="blue.600" />
                불법·탈법 차명거래 금지 설명 확인서
              </ListItem>
              <ListItem>
                <Box pl={4}>
                  『금융실명거래 및 비밀보장에 관한 법률』 제3조 제 3항에 따라
                  불법재산의 은닉. 자금세탁 행위, 공중협박 자금조달행위 및 강제
                  집행의 면탈, 그 밖에 탈법행위를 목적으로 타인의 실명으로
                  금융거래를 하여서는 아니되며, 이를 위반시 5년 이하의 징역 또는
                  5천만우너 이하의 벌금에 처할 수 있습니다. 본인은 위 안내에
                  대해 담당직원으로부터 충분한 설명을 들어 이해하였음을
                  확인합니다.
                </Box>
              </ListItem>
              <ListItem>
                <ListIcon as={TbSquareRoundedFilled} color="blue.600" />
                예금보험관계 설명 확인
              </ListItem>
              <ListItem>
                <Box pl={4}>
                  본인이 가입하는 금융상품의 예금자보호여부(원금과 소정의 이자를
                  합하여 1인당 5천만원)에 대하여 우리은행으로부터 설명듣고
                  이해하였음을 확인합니다.
                </Box>
              </ListItem>
              <ListItem>
                <ListIcon as={TbSquareRoundedFilled} color="blue.600" />
                최초 금융 거래시
              </ListItem>
              <ListItem>
                <Box pl={4}>
                  금융지주회사법 제48조의 2에 근거, 우리금융그룹내 자회사간에는
                  고객 정보의 제공·이용이 가능함과 고객 정보의 취급방침에 대한
                  설명 및 교부를 받았습니다.{" "}
                </Box>
              </ListItem>
            </List>
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Text fontSize="2xl">※ 위 내용을 설명들었음. </Text>
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
