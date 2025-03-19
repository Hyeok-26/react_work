
import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';

/*
    show: Modal 을 띄울지 여부 (boolean)
    message : Modal 메세지  (string)
    onYes : Modal 의 확인 버튼을 눌렀을 떄 호출될 함수 (function)
*/
function AlertModal({show,message,onYes}) {
    
    return (
        <Modal show={show}>
            <Modal.Header>알림</Modal.Header>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button variant='success' onClick={onYes}>확인</Button>
            </ModalFooter>
        </Modal>
    );
}

export default AlertModal;