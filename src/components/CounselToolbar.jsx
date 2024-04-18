import React, { useState } from 'react'
import { Text, Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import CheckIdentification from './CheckIdentification';

export default function CounselToolbar({ publisher, isIdentifyUser }) {
  const [isRequest, setRequest] = useState(false);

  const sendMessage = () => {
    if (publisher) {
      publisher.stream.session.signal({
        data: JSON.stringify('request'),
        type: 'identify'
      })
    }
  }

  publisher.stream.session.on('signal:identify', (event) => {
    const data = JSON.parse(event.data);
    if (data === 'request') {
      setRequest(true)
    }
  });

  return (
    <>
      {/* TODO : 고객인지 상담사인지에 따라 view 분기처리 */}
      <Box backgroundColor="gray" p={4}>
        {isIdentifyUser ? <Text>신분증 확인 완료</Text> :
          <HStack>
            <Text>신분증 미확인</Text>
            <Button onClick={sendMessage}>신분증 확인창 전송</Button>
          </HStack>}
      </Box>

      {/* TODO : (조건 추가) role이 사용자이고, isRequest === true일때만 */}
      {isRequest && <CheckIdentification streamManager={publisher} />}


    </>
  )
}
