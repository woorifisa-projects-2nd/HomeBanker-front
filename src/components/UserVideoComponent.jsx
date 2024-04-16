import {React, useState} from 'react'
import OpenViduVideoComponent from './OpenViduVideoComponent';
import { Text } from '@chakra-ui/react'
import ChatComponent from './Chat';


export default function UserVideoComponent({ streamManager, role }) {

  const [chatDisplay,setChatDisplay] = useState('chat'); 

  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }

  return (
    <>
      {streamManager !== undefined ? <>
        <OpenViduVideoComponent streamManager={streamManager} role={role} />
        </>
        : null
      }</>
  )
}
