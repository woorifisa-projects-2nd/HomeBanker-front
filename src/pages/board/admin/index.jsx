import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  TabIndicator,
} from "@chakra-ui/react";
import ProductsTab from "../../../components/board/admin/ProductsTab";
import BoardsTab from "../../../components/board/admin/BoardsTab";
import Header from "../../../components/Header";
export default function Board() {
  const commonCellStyle = {
    fontFamily: "Noto Sans",
    fontStyle: "normal",
    fontSize: "30px",
    lineHeight: "17px",
    color: "black",
    marginTop: "50px",
    marginLeft: "50px",
    fontWeight: 600,
  };
  return (
    <>
      <Header />
      <Tabs>
        <TabList>
          <Tab
            style={{
              ...commonCellStyle,
              fontWeight: 600,
              width: "260px",
              height: "25px",
              padding: "20px",
              paddingBottom: "30px",
            }}
          >
            상담 게시판
          </Tab>
          <Tab
            style={{
              ...commonCellStyle,
              fontWeight: 600,
              width: "260px",
              height: "25px",
              padding: "20px",
              paddingBottom: "30px",
            }}
          >
            상품 관리
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.3px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
          style={{
            border: "3px solid #3686DF",
          }}
        />
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
