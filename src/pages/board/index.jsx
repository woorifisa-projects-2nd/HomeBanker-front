import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel, Box, Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

export default function Board() {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>고객상담 게시판 관리</Tab>
          <Tab>서비스 관리</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex justifyContent="space-around">
              <Flex flexDirection="column">
                <span>등록일</span>
                <span>2024-03-29</span>
                <span>2024-03-30</span>
              </Flex>
              <Flex flexDirection="column">
                <span>답변여부</span>
                <span>X</span>
                <span>X</span>
              </Flex>
              <Flex flexDirection="column">
                <span>내용(앞에서 10글자만)</span>
                <span>안녕하세요, 고객님. 제가 장기간 궁금해하시던 내용에 대해서 설명드리겠습니다.</span>
                <span>질문이 있어서 남깁니다.</span>
              </Flex>
              <Flex flexDirection="column">
                <span>고객이름</span>
                <span>홍길동</span>
                <span>둘리</span>
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="space-around">
              <Flex flexDirection="column">
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem>전체</MenuItem>
                    <MenuItem>카드</MenuItem>
                    <MenuItem>예/적금</MenuItem>
                    <MenuItem>대출</MenuItem>
                  </MenuList>
                </Menu>
                <span>카드</span>
                <span>등록일</span>
              </Flex>
              <Flex flexDirection="column">
                <span>등록일</span>
                <span>2024-03-29</span>
                <span>2024-03-30</span>
              </Flex>
              <Flex flexDirection="column">
                <span>상품이름</span>
                <span>나라사랑카드</span>
                <span>전세자금대출</span>
              </Flex>
              <Flex flexDirection="column">
                <span>상품설명(앞에서 10글자만)</span>
                <span>안녕하세요, 고객님. 제가 장기간 궁금해하시던 내용에 대해서 설명드리겠습니다.</span>
                <span>질문이 있어서 남깁니다.</span>
              </Flex>
              <Flex flexDirection="column">
                <span>금리</span>
                <span>홍길동</span>
                <span>둘리</span>
              </Flex>
              <Flex flexDirection="column">
                <span>노출여부</span>
                <span>홍길동</span>
                <span>둘리</span>
              </Flex>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
