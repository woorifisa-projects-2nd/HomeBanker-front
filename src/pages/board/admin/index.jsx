import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import ProductsTab from "../../../components/board/admin/ProductsTab";
import BoardsTab from "../../../components/board/admin/BoardsTab";

export default function Board() {
  return (
    <>
      <Text>관리자 상담게시판</Text>
      <Tabs>
        <TabList>
          <Tab>상담 게시판</Tab>
          <Tab>상품 관리</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BoardsTab />
          </TabPanel>
          <TabPanel>
            <ProductsTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
