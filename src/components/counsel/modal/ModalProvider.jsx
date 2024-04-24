import React, { useState } from "react";

export const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);

  const value = {
    state: { isModalDisplayed },
    actions: { setIsModalDisplayed },
  };

  return (
    // TransferContext.Provider로 감싸 Context를 사용
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
