import Modal from "react-bootstrap/esm/Modal";

const DeleteModal = (props) => {
  return (
    <Modal
      show={props.showDelete}
      onHide={() => props.setShowDelete(false)}
      backdrop={true}
      className='modal modal-video-add'
    >
      <div className='border-modal border-modal-delete'>
        <Modal.Header>
          <span className='x-close close-layer-delete' onClick={() => props.setShowDelete(false)}>x</span>
          <Modal.Title>Are you sure you want to delete ?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-buttons modal-button-delete'>
          <button className='modal-button ok' onClick={props.onClickDeleteOK}>OK</button>
          <button className='modal-button cancel' onClick={() => props.setShowDelete(false)}>Cancel</button>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default DeleteModal;