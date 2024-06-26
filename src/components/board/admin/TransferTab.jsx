import React, { useState } from "react";
import ProductsTab from "./ProductsTab";
import EnrollmentTab from "./EnrollmentTab";
import { Box, Grid, GridItem, Flex } from "@chakra-ui/react";

export const TransferContext = React.createContext();

const Transfer = ({
  session,
  user,
  productName,
  productId,
  productDescription,
  amount,
  period,
  bankerId,

  // isModalDisplayed,
}) => {
  // 선택된 상품과 가입 정보를 상태로 관리
  const [selectedProduct, setSelectedProduct] = useState(undefined);
  const [enrollmentData, setEnrollmentData] = useState(null);

  return (
    // TransferContext.Provider로 감싸 Context를 사용
    <TransferContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        enrollmentData,
        setEnrollmentData,
      }}
    >
      <Flex
        maxHeight="calc(100vh - 230px)"
        direction="column"
        pt="10px"
        justify="space-between"
      >
        <ProductsTab
          isBoxStyle={true}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          isDisplayed={false}
        />

        <EnrollmentTab
          session={session}
          user={user}
          productName={productName}
          productId={productId}
          productDescription={productDescription}
          modalAmount={amount}
          ModalPeriod={period}
          bankerId_={bankerId}
          // isModalDisplayed={isModalDisplayed}
        />
      </Flex>
    </TransferContext.Provider>
  );
};

export default Transfer;
