import React, { useState } from "react";
import { FModal } from "./FModal";
import { SModal } from "./SModal";
import { TModal } from "./TModal";

// export const ModalListContext = React.createContext({
//   visible: false,
//   setVisible: () => {},
// });

// const { isModalDisplayed } = useContext(TransferContext);

let content = null;

export const ModalList = ({ MODE, ...props }) => {
  if (MODE === "F") {
    content = <FModal {...props} />;
  } else if (MODE === "S") {
    content = <SModal {...props} />;
  } else if (MODE === "T") {
    content = <TModal {...props} />;
  }

  return <>{content}</>;
};
