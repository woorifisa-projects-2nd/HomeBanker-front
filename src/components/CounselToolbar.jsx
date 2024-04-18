import React, { useState } from 'react'
import { Text, Box, useDisclosure } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import CheckIdentification from './CheckIdentification';
import useCheckRole from '../hook/useCheckRole';

export default function CounselToolbar({ publisher }) {
  const [isIdentifiedUser, setIdentifyUser] = useState(false);
  const { role } = useCheckRole();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const sendMessage = () => {
    if (publisher) {
      publisher.stream.session.signal({
        data: JSON.stringify('request'),
        type: 'identify'
      })
    }
  }

  const closeModalMessage = () => {
    if (publisher && role === 'ROLE_ADMIN') {
      publisher.stream.session.signal({
        data: JSON.stringify('close'),
        type: 'identify'
      })
    }
  }

  publisher.stream.session.on('signal:identify', (event) => {
    const data = JSON.parse(event.data);
    if (data === 'close') {
      if (role === 'ROLE_CUSTOMER') {
        onClose();
      }
    }
  });

  publisher.stream.session.on('signal:identify', (event) => {
    const data = JSON.parse(event.data);
    if (data === 'request') {
      onOpen();
    }
  });

  return (
    <>
      {role === 'ROLE_ADMIN' &&
        <Box backgroundColor="gray" p={4}>
          {isIdentifiedUser ?
            <Text>신분증 확인 완료</Text>
            :
            <HStack>
              <Text>신분증 미확인</Text>
              <Button onClick={sendMessage}>신분증 확인창 전송</Button>
            </HStack>}
        </Box>}

      <CheckIdentification
        isOpen={isOpen}
        onClose={() => {
          onClose()
          closeModalMessage()
        }}
        onOpen={onOpen}
        setIdentifyUser={setIdentifyUser}
        isIdentifiedUser={isIdentifiedUser}
        streamManager={publisher} />
    </>
  )
}
