import React, { useCallback, useRef, useState } from 'react'
import CustomModal from './Modal'
import { Button, Spinner } from '@chakra-ui/react'
import { Stack, Box, Text } from '@chakra-ui/react';
import OpenViduVideoComponent from './OpenViduVideoComponent';
import { v4 as uuidV4 } from 'uuid';
import html2canvas from 'html2canvas';

const NAVER_INVOKE_URL = import.meta.env.VITE_NAVER_INVOKE_URL
const NAVER_OCR_SECRET_KEY = import.meta.env.VITE_NAVER_OCR_SECRET_KEY
import Axios from 'axios';
import { personalNumberFormatter } from '../util/counsel';
import useCheckRole from '../hook/useCheckRole';
import { api } from '../api/api';

export default function CheckIdentification({ isOpen, onClose, streamManager, setIdentifyUser }) {
  const videoRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const { role } = useCheckRole();

  const onCapture = () => {
    if (videoRef.current) {
      html2canvas(videoRef.current).then((canvas) => {
        checkOCR(canvas.toDataURL("image/jpg"))
        setLoading(true)
      })
    }
  }

  const removeDataPrefix = useCallback((dataString) => {
    return dataString.replace(/^data:image\/png;base64,/, "");
  }, [])

  // 신분증 OCR api
  const checkOCR = (uri) => {
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
        const personalNumber = personalNumberFormatter(res.data.images[0].idCard.result.ic.personalNum[0].formatted.value)
        const name = res.data.images[0].idCard.result.ic.name[0].formatted.value
        indentifyUser(personalNumber, name)
      }
    }).catch(e => {
      console.error('실패', e)
      alert("캡처에 실패했습니다.")
      onClose();
    })
  }

  // 서버에 금융결제원 api 확인 요청
  // TODO: 리팩토링 필요
  const indentifyUser = (personalNumber, name) => {
    api.post('/api/banker/video/identify', {
      identity: personalNumber,
      userName: name
    }).then(() => {
      setIdentifyUser(true)
      onClose();
    }).catch()
  }

  return (
    <CustomModal size={'4xl'} isOpen={isOpen} onClose={onClose}>
      <>
        {isLoading ? <Spinner /> : <></>}
        <Stack flexDirection="column" alignItems="center" >
          <Text>사각형에 맞게 신분증을 가로로 놓아주세요.</Text>
          {streamManager !== undefined &&
            <Box ref={videoRef} >
              <OpenViduVideoComponent size={"100%"} streamManager={streamManager} />
            </Box>}
        </Stack>
        {role === "ROLE_ADMIN" && <Button onClick={onCapture}>{'캡쳐하기'}</Button>}
      </>
    </CustomModal>
  )
}
