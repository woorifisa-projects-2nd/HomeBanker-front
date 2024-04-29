import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import React from "react";
/**
 * 인자값으로 넘겨줄 수 있는 항목
 * @param {boolean} isOpen
 * @param {boolean} onClose
 * @param {JSX.Element} children
 * @param {number} size
 * @param {string} title
 * @param {string} successMessage
 * @param {function} successAction
 */

export default function CustomModal({
  isOpen,
  onClose,
  children,
  size,
  title,
  successMessage,
  successAction,
}) {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size={size}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {successAction && (
          <ModalFooter>
            <Button onClick={successAction}>{successMessage}</Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
