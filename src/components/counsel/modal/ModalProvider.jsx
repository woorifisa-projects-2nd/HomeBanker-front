import React, { useState } from "react";

export const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [sign, setSign] = useState("");
  const [modalMODE, setModalMODE] = useState("F");
  const [bankerId, setBankerId] = useState("");
  const [customerId, setCustomerId] = useState("");

  const value = {
    state: { isModalDisplayed },
    actions: { setIsModalDisplayed },
    signState: { isSigned }, //서명 여부
    signAction: { setIsSigned },
    signImg: { sign }, //서명이미지(base64)
    signImgAction: { setSign },
    mode: { modalMODE },
    setMode: { setModalMODE },
    id: { bankerId },
    idAction: { setBankerId },
    cId: { customerId },
    CIdAction: { setCustomerId },
  };

  return (
    // TransferContext.Provider로 감싸 Context를 사용
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
