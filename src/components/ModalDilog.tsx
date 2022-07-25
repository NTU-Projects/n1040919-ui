import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDilog({children,show,setData}:{children:string,show:boolean,setData:()=>void}) {
  const [showDilog, setShowDilog] = useState(show);

  const handleClose = () => {
    setShowDilog(false);
    setData();
  }
  const handleShow = () => setShowDilog(true);

  return (
    <>
      <Modal
        show={showDilog}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='btn btn-danger' onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDilog;