import React, { useState } from 'react'
import { Text, Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import CheckIdentification from './CheckIdentification';
import useCheckRole from '../hook/useCheckRole';

export default function CounselToolbar({ publisher }) {
  const [isRequest, setRequest] = useState(false);
  const [isIdentifyUser, setIdentifyUser] = useState(false);
  const { role } = useCheckRole();

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
      {role === 'ROLE_ADMIN' &&
        <Box backgroundColor="gray" p={4}>
          {isIdentifyUser ?
            <Text>신분증 확인 완료</Text>
            :
            <HStack>
              <Text>신분증 미확인</Text>
              <Button onClick={sendMessage}>신분증 확인창 전송</Button>
            </HStack>}
        </Box>}

      {role === 'ROLE_CUSTOMER' && isRequest &&
        <CheckIdentification
          setIdentifyUser={setIdentifyUser}
          streamManager={publisher} />}


    </>
  )
}
