import CustomModal from "../../Modal";
import {
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useContext } from "react";

import { TbSquareRoundedFilled } from "react-icons/tb";
import Canvas from "../Canvas";
import { ModalContext } from "./ModalProvider";
import useCheckRole from "../../../hook/useCheckRole";

// const signchecker =() => {
//   if(isSigned)

//   else

// }

export const SModal = ({
  isOpen,
  onClose,
  children,
  size,
  title,
  successMessage,
  successAction,
  session,
  user,
}) => {
  const { role } = useCheckRole();

  const { state, actions, mode, setMode } = useContext(ModalContext);
  const { isModalDisplayed } = state;
  // const { setIsModalDisplayed } = actions;
  const { modalMODE } = mode;
  const { setModalMODE } = setMode;
  // const { setSign } = signImgAction;

  const buttonAction = () => {
    if (role === "ROLE_CUSTOMER") setModalMODE("T");

    const transferData = {
      nextModal: "T",
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
        title={
          <Text fontSize="4xl">
            일괄 기명 및 서명<span class="blind">일괄 기명 및 서명</span>
          </Text>
        }
        size={size}
        successMessage={successMessage}
        successAction={() => {
          if (role === "ROLE_CUSTOMER") buttonAction();
        }}
        // successAction={() => {
        //   if (role === "ROLE_CUSTOMER") setModalMODE("S");
        // }}
      >
        <>
          <ModalCloseButton />
          <Text fontSize="3xl">
            <List spacing={3}>
              <ListItem>
                <ListIcon as={TbSquareRoundedFilled} color="blue.600" />
                본인은 디지털 서식을 이용하여 은행거래를 진행함에 있어 ‘일괄
                기명 및 서명’ 방식에 동의하며, 전산으로 입력된 정보가 본인의
                의사와 틀림없음을 확인합니다.
                <span class="blind">
                  본인은 디지털 서식을 이용하여 은행거래를 진행함에 있어 ‘일괄
                  기명 및 서명’ 방식에 동의하며, 전산으로 입력된 정보가 본인의
                  의사와 틀림없음을 확인합니다.
                </span>
              </ListItem>
              <ListItem>
                <ListIcon as={TbSquareRoundedFilled} color="blue.600" />
                본인은 ‘일괄 기명 및 서명’ 방식의 내용에 대해 충분한 설명을 듣고
                이해하였으며, 이는 본인의 의사에 기한 것으로 이에 대해 이의
                없음을 확인합니다.
                <span class="blind">
                  본인은 ‘일괄 기명 및 서명’ 방식의 내용에 대해 충분한 설명을
                  듣고 이해하였으며, 이는 본인의 의사에 기한 것으로 이에 대해
                  이의 없음을 확인합니다.
                </span>
              </ListItem>
              <ListItem>
                <ListIcon as={TbSquareRoundedFilled} color="blue.600" />
                상품의 주요 내용, 투자위험, 원금손실 가능성 등 투자상품 가입 시
                유의사항을 충분히 숙지하고 이해하였음을 확인하는 항목에 기명 및
                서명을 사용하는 것에 대하여 동의합니다.
                <span class="blind">
                  상품의 주요 내용, 투자위험, 원금손실 가능성 등 투자상품 가입
                  시 유의사항을 충분히 숙지하고 이해하였음을 확인하는 항목에
                  기명 및 서명을 사용하는 것에 대하여 동의합니다.
                </span>
              </ListItem>

              <ListItem>
                <ListIcon as={TbSquareRoundedFilled} color="blue.600" />
                또한 아래 본인/대리인의 기명 및 서명은 직접 기재하였음을
                확인합니다.
              </ListItem>
            </List>
          </Text>
          <Stack
            mt="60px"
            ml="10px"
            spacing={[1, 5]}
            direction={["column", "row"]}
          >
            {role == "ROLE_ADMIN" ? (
              <Text fontSize="4xl">
                ※ 고객님에게 서명하도록 안내하세요.
                <span class="blind">※ 고객님에게 서명하도록 안내하세요.</span>
              </Text>
            ) : (
              <Text fontSize="4xl">
                ※ 위 내용에 대하여 동의합니다.
                <span class="blind">※ 위 내용에 대하여 동의합니다.</span>
              </Text>
            )}
          </Stack>
          {role == "ROLE_ADMIN" ? null : <Canvas></Canvas>}
        </>
      </CustomModal>
    </>
  );
};
