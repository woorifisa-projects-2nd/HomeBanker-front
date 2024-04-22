import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import ProfileTab from "../../components/mypage/ProfileTab";
import SaleTab from "../../components/mypage/SaleTab"
import Header from "../../components/Header";

export default function MyPage() {
  return (
    <>
      <Header />
      <Text>마이페이지</Text>
      <Tabs>
        <TabList>
          <Tab>나의 프로필</Tab>
          <Tab>나의 상품가입 정보</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProfileTab />
          </TabPanel>
          <TabPanel>
            <SaleTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
