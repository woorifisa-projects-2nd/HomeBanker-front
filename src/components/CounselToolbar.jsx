import React from 'react'
import { Text, Box } from '@chakra-ui/react';

export default function CounselToolbar({ isIdentifyUser }) {
  return (
    <Box backgroundColor="gray" p={4}>
      {isIdentifyUser ? <Text>신분증 확인 완료</Text> : <Text>신분증 미확인</Text>}
    </Box>
  )
}
