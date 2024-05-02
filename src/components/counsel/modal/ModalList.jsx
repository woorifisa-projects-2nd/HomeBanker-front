import React, { useState, useContext } from "react";
import { FModal } from "./FModal";
import { SModal } from "./SModal";
import { TModal } from "./TModal";
import { ModalContext } from "./ModalProvider";

let content = null;

export const ModalList = ({ ...props }) => {
  const { state, actions, mode, setMode } = useContext(ModalContext);
  // const { isModalDisplayed } = state;
  // const { setIsModalDisplayed } = actions;
  const { modalMODE } = mode;

  if (modalMODE === "F") {
    content = <FModal {...props} />;
  } else if (modalMODE === "S") {
    content = <SModal {...props} />;
  } else if (modalMODE === "T") {
    content = <TModal {...props} />;
  }

  return <>{content}</>;
};
