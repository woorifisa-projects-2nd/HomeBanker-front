import CustomModal from "../../../components/Modal";
import {
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  useRadioGroup,
  HStack,
} from "@chakra-ui/react";

import { TbSquareRoundedFilled } from "react-icons/tb";
// import RadioCard from "../../../components/RadioCard";
import Canvas from "../../../components/counsel/Canvas";

export const FModal = ({
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
    name: "checkbox",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={"일괄 기명 및 서명"}
        size={size}
        successMessage={successMessage}
        successAction={successAction}
        children={
          <>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={TbSquareRoundedFilled} color="blue.600" />
                본인은 디지털 서식을 이용하여 은행거래를 진행함에 있어 ‘일괄
                기명 및 서명’ 방식에 동의하며, 전산으로 입력된 정보가 본인의
                의사와 틀림없음을 확인합니다.
              </ListItem>
              <ListItem>
                <ListIcon as={TbSquareRoundedFilled} color="blue.600" />
                본인은 ‘일괄 기명 및 서명’ 방식의 내용에 대해 충분한 설명을 듣고
                이해하였으며, 이는 본인의 의사에 기한 것으로 이에 대해 이의
                없음을 확인합니다.
              </ListItem>
              <ListItem>
                <ListIcon as={TbSquareRoundedFilled} color="blue.600" />
                상품의 주요 내용, 투자위험, 원금손실 가능성 등 투자상품 가입 시
                유의사항을 충분히 숙지하고 이해하였음을 확인하는 항목에 기명 및
                서명을 사용하는 것에 대하여 동의합니다.
              </ListItem>

              <ListItem>
                <ListIcon as={TbSquareRoundedFilled} color="blue.600" />
                또한 아래 본인/대리인의 기명 및 서명은 직접 기재하였음을
                확인합니다.
              </ListItem>
            </List>
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Text fontSize="2xl">※ 위 내용에 대하여 동의합니다. </Text>
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
            <Canvas></Canvas>
          </>
        }
      ></CustomModal>
    </>
  );
};
