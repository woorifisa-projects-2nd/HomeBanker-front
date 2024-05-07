import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  TabIndicator, Box
} from "@chakra-ui/react";
import ProductsTab from "../../../components/board/admin/ProductsTab";
import BoardsTab from "../../../components/board/admin/BoardsTab";
import Header from "../../../components/Header";
export default function Board() {
  const commonCellStyle = {
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
      <Box
        mt={10}
      >
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
              data-cy="products"
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
          <TabPanels >
            <TabPanel mt={16}>
              <BoardsTab />
            </TabPanel>
            <TabPanel mt={6}>
              <ProductsTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
