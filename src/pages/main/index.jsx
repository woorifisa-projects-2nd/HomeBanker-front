import { Button, Stack, Flex } from "@chakra-ui/react";

export default function Main() {
  return (
    <>
      <Flex direction="column" alignItems="center">
        <h2>손님, 원하시는 업무를 선택해주새요.</h2>
        <Stack spacing={8} direction="row" align="center" margin="30px">
          <Button size="md" height="48px" width="200px" border="2px" borderColor="green.500">
            예/적금 업무
          </Button>
          <Button size="md" height="48px" width="200px" border="2px" borderColor="green.500">
            카드 업무
          </Button>
        </Stack>
        <Stack spacing={8} direction="row" align="center">
          <Button size="md" height="48px" width="200px" border="2px" borderColor="green.500">
            대출 업무
          </Button>
          <Button size="md" height="48px" width="200px" border="2px" borderColor="green.500">
            고객상담 게시판
          </Button>
        </Stack>
      </Flex>
    </>
  );
}
