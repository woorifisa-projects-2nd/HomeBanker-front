import React, { useCallback, useRef } from 'react'
import CustomModal from './Modal'
import { Button, useDisclosure } from '@chakra-ui/react'
import { Stack, Box, Text } from '@chakra-ui/react';
import OpenViduVideoComponent from './OpenViduVideoComponent';
import html2canvas from "html2canvas";
import Axios from 'axios';
import { v4 as uuidV4 } from 'uuid';

const NAVER_INVOKE_URL = import.meta.env.VITE_NAVER_INVOKE_URL
const NAVER_OCR_SECRET_KEY = import.meta.env.VITE_NAVER_OCR_SECRET_KEY

export default function CheckIdentification({ streamManager }) {
  const videoRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onCapture = () => {
    if (videoRef.current) {
      html2canvas(videoRef.current).then((canvas) => {
        onSaveAsFile(canvas.toDataURL("image/jpg"))
      })
    }
  }

  const removeDataPrefix = useCallback((dataString) => {
    return dataString.replace(/^data:image\/png;base64,/, "");
  }, [])

  const onSaveAsFile = (uri) => {
    const uriData = removeDataPrefix(uri)
    const message = {
      images: [
        {
          format: 'jpg', // file format
          name: 'demo', // file name
          data: uriData
        }
      ],
      requestId: String(uuidV4()), // unique string
      timestamp: 0,
      resultType: "string",
      lang: "ko",
      version: 'V2'
    }

    Axios.post(NAVER_INVOKE_URL, message, {
      headers: {
        'Content-Type': 'application/json',
        'X-OCR-SECRET': NAVER_OCR_SECRET_KEY,
      }
    }).then(res => {
      if (res.status === 200) {
        // 추출완료후 res에 담긴 데이터 선별하여
        // 서버 요청
        onClose();
      }
    }).catch(e => {
      console.error('실패', e)
      alert("캡처에 실패했습니다.")
    })
  }

  return (
    <>
      <Button onClick={onOpen}>신분증 캡쳐하기</Button>

      <CustomModal size={'4xl'} isOpen={isOpen} onClose={onClose}
        successMessage={'캡쳐하기'} successAction={onCapture}
      >
        <Stack flexDirection="column" alignItems="center" >
          <Text>사각형에 맞게 신분증을 가로로 놓아주세요.</Text>
          {streamManager !== undefined &&
            <Box ref={videoRef} >
              <OpenViduVideoComponent size={"100%"} streamManager={streamManager} />
            </Box>}
        </Stack>
      </CustomModal>
    </>
  )
}
