import CustomModal from "../../Modal";
import {
  Text,
  Stack,
  useRadioGroup,
  HStack,
  List,
  ListItem,
  ListIcon,
  Box,
  useToast,
} from "@chakra-ui/react";
// import RadioCard from "../../../components/RadioCard";
import { TbSquareRoundedFilled } from "react-icons/tb";
import useCheckId from "../../../hook/useCheckId";
import { api } from "../../../api/api";
import moment from "moment";
import "moment/locale/ko";
import useCheckRole from "../../../hook/useCheckRole";
import { ModalContext } from "./ModalProvider";
import { useContext } from "react";

export const TModal = ({
  isOpen,
  onClose,
  children,
  size,
  title,
  successMessage,
  successAction,
  productName,
  productId,
  amount,
  period,
  bankerId,
  session,
  user,
}) => {
  const loginId = useCheckId().loginId;
  const datetime = moment().format("YYYY-MM-DD");
  const { role } = useCheckRole();
  const toast = useToast();

  const { state, actions, setMode } = useContext(ModalContext);
  const { isModalDisplayed } = state;
  const { setIsModalDisplayed } = actions;
  const { setModalMODE } = setMode;

  const enrollment = (productId, amount, period, bankerId) => {
    const message = {
      customerLoginId: loginId,
      bankerLoginId: bankerId,
      productId: productId,
      saleMonth: period,
      saleAmount: amount,
      createdAt: datetime,
    };
    console.log(message);

    api
      .post(`/api/product/register`, message)
      .then(() => {
        toast({
          position: "top",
          title: "상품 가입이 완료되었습니다",
          status: "success",
          duration: 1000,
          isClosable: true,
        });

        buttonAction();
      })
      .catch((e) => {
        toast({
          position: "top",
          title: "상품 가입이 완료되지 않았습니다",
          status: "error",
          duration: 1000,
          isClosable: true,
        });

        // setModalMODE("F");

        buttonAction();

        console.log("error : " + e);
      });
  };

  const buttonAction = () => {
    setModalMODE("F");
    setIsModalDisplayed(false);

    const transferData = {
      nextModal: "F",
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
          console.log("다음 모달 F로 이동 완료");
        })
        .catch((error) => {
          console.error("다음 모달 F로 이동 불가", error);
        });
    }
  };

  return (
    <>
      <CustomModal
        isOpen={isModalDisplayed}
        onClose={onClose}
        title={"고객 확인"}
        size={size}
        successMessage={"완료"}
        successAction={() => {
          if (role === "ROLE_CUSTOMER")
            enrollment(productId, amount, period, bankerId);
        }}
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
              {role == "ROLE_ADMIN" ? (
                <Text fontSize="2xl">※ 위 내용을 설명하세요. </Text>
              ) : (
                <Text fontSize="2xl">※ 위 내용을 설명들었음. </Text>
              )}
            </Stack>
          </>
        }
      ></CustomModal>
    </>
  );
};
