import React from 'react';
import { ModalMask } from './styles';

const Modal = function ({ children }) {
    return (
        <ModalMask>
            {children}
        </ModalMask>
    )
}

Modal.ModalContent = function ({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}

export default Modal;

