import { useRef, useState } from "react";
import CustomModal from "./Modal";
import { Spinner, ModalCloseButton } from "@chakra-ui/react";
import { Stack, Box, Text } from "@chakra-ui/react";
import OpenViduVideoComponent from "./OpenViduVideoComponent";
import { v4 as uuidV4 } from "uuid";
import html2canvas from "html2canvas";

const NAVER_INVOKE_URL = import.meta.env.VITE_NAVER_INVOKE_URL;
const NAVER_OCR_SECRET_KEY = import.meta.env.VITE_NAVER_OCR_SECRET_KEY;

import Axios from "axios";
import { personalNumberFormatter } from "../util/counsel";
import useCheckRole from "../hook/useCheckRole";
import { api } from "../api/api";

export default function CheckIdentification({
  isOpen,
  onClose,
  streamManager,
  setIdentifyUser,
  comfirmSignal,
}) {
  const videoRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const { role } = useCheckRole();

  const onCapture = () => {
    if (videoRef.current) {
      html2canvas(videoRef.current).then((canvas) => {
        checkOCR(canvas.toDataURL("image/jpg"));
        setLoading(true);
      });
    }
  };

  const removeDataPrefix = (dataString) => {
    const data = dataString.replace(/^data:image\/png;base64,/, "");
    console.log(data);
    return data;
  };

  // 신분증 OCR api
  const checkOCR = (uri) => {
    const uriData = removeDataPrefix(uri);
    const message = {
      images: [
        {
          format: "jpg", // file format
          name: "demo", // file name
          data: uriData,
        },
      ],
      requestId: String(uuidV4()), // unique string
      timestamp: 0,
      resultType: "string",
      lang: "ko",
      version: "V2",
    };

    Axios.post(NAVER_INVOKE_URL, message, {
      headers: {
        "Content-Type": "application/json",
        "X-OCR-SECRET": NAVER_OCR_SECRET_KEY,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const personalNumber = personalNumberFormatter(
            res.data.images[0].idCard.result.ic.personalNum[0].formatted.value,
          );
          const name =
            res.data.images[0].idCard.result.ic.name[0].formatted.value;
          indentifyUser(personalNumber, name);
        }
      })
      .catch((e) => {
        console.error("실패", e);
        alert(NAVER_INVOKE_URL);
        alert("캡처에 실패했습니다.");
        onClose();
      });
  };

  // 서버에 금융결제원 api 확인 요청
  // TODO: 리팩토링 필요
  const indentifyUser = (personalNumber, name) => {
    api
      .post("/api/banker/video/identify", {
        identity: personalNumber,
        userName: name,
      })
      .then(() => {
        setIdentifyUser(true);
        comfirmSignal();
        onClose();
      })
      .catch();
  };

  return (
    <CustomModal
      size={"4xl"}
      width={530}
      height={511}
      isOpen={isOpen}
      onClose={onClose}
      successAction={role === "ROLE_ADMIN" && onCapture}
      successMessage={role === "ROLE_ADMIN" && "캡쳐하기"}
    >
      <>
        {role === "ROLE_ADMIN" && (
          <ModalCloseButton
            onClose={() => {
              onClose();
            }}
          />
        )}
        {isLoading ? <Spinner /> : <></>}
        <Stack
          flexDirection="column"
          alignItems="center"
          fontSize={"24px"}
          spacing={10}
        >
          <Stack>
            <Text textAlign={"center"}>사각형에 맞게 </Text>
            <Text textAlign={"center"}>신분증을 가로로 놓아주세요.</Text>
          </Stack>
          {streamManager !== undefined && (
            <Box ref={videoRef}>
              <OpenViduVideoComponent
                displayMargin={false}
                size={"100%"}
                streamManager={streamManager}
              />
            </Box>
          )}
        </Stack>
      </>
    </CustomModal>
  );
}
