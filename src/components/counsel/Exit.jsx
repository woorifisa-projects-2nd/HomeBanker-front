import React from 'react'
import {Flex, Stack, Text, Spacer} from '@chakra-ui/react'

const Exit = ({time}) => {
  return (
    <>
    <div style={{backgroundColor:'pink', position: 'fixed',top:'50%', left:'50%', transform:'translate(-50%,-50%)'}}>
        <Flex direction='column'>
            <Text>
                {time}초후에 상담이 종료됩니다.
            </Text>
            <Spacer/>
            <Text>
                우리집은행 화상상담을 이용해주셔서 감사합니다.
            </Text>
        </Flex>
    </div>
    </>
  )
}

export default Exit