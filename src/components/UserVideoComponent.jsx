import React from 'react'
import OpenViduVideoComponent from './OpenViduVideoComponent';
import { Text } from '@chakra-ui/react'

export default function UserVideoComponent({ streamManager }) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }

  return (
    <>
      {streamManager !== undefined ? null
        : <>
          <OpenViduVideoComponent streamManager={streamManager} />
          <Text>{getNicknameTag()}</Text>
        </>
      }</>
  )
}
