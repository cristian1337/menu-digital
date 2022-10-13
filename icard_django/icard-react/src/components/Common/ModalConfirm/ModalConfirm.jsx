import React from 'react'
import { Button, Modal } from 'flowbite-react'

export function ModalConfirm(props) {
    const { title, show, onCloseButton, onClose, onCloseText, onConfirm, onConfirmText } = props

  return (
    <Modal
    show={show}
    onClose={onCloseButton}
    >
    {title && (
        <Modal.Header>
            {title}
        </Modal.Header>
    )}
    <Modal.Body>
        <div className="flex justify-center gap-4">
            <Button
                color="success"
                onClick={onConfirm}
            >
                {onConfirmText || 'Aceptar'}
            </Button>
            <Button
                color="failure"
                onClick={onClose}
            >
                {onCloseText || 'Cancelar'}
            </Button>
        </div>
    </Modal.Body>
  </Modal>
  )
}
