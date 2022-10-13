import React from 'react'
import {Modal, Button} from 'flowbite-react';

export function ModalBasic(props) {
    const {show, size, title, children, onClose} = props;
  return (
    <>
    <Modal
    show={show}
    onClose={onClose}
    size={size}
  >
    {title && <Modal.Header>
      {title}
    </Modal.Header>}
    <Modal.Body>
      {children}
    </Modal.Body>
  </Modal>
    </>
  )
}

ModalBasic.defaultProps = {
    size: 'lg'
}
