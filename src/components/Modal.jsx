import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import React from 'react'

export default function CustomModal({ isOpen, onClose, children, size, title, successMessage, successAction }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button onClick={successAction}>{successMessage}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
