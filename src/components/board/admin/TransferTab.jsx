import React, { useState } from "react";
import ProductsTab from "./ProductsTab";
import EnrollmentTab from "./EnrollmentTab";

export const TransferContext = React.createContext();

const Transfer = ({
  session,
  user,
  productName,
  productId,
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
      <div>
        <ProductsTab
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          isDisplayed={false}
        />
        <EnrollmentTab
          session={session}
          user={user}
          productName={productName}
          productId={productId}
          modalAmount={amount}
          ModalPeriod={period}
          bankerId_={bankerId}
          // isModalDisplayed={isModalDisplayed}
        />
      </div>
    </TransferContext.Provider>
  );
};

export default Transfer;
