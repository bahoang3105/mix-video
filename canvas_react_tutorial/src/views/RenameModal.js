import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const RenameModal = (props) => {
  const [name, setName] = useState(props.name);
  const rename = () => {
    props.rename(name);
    props.setShow(false);
  }
  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      backdrop={true}
      className='modal'
    >
      <div className='border-modal'>
        <Modal.Header>
          <span className='x-close close-video' onClick={() => props.setShow(false)}>x</span>
          <Modal.Title>
            Rename
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='title-rename'>
            Please enter new name there
          </div>
          <input type='text' value={name} onChange={e => setName(e.target.value)} className='input-rename' />
        </Modal.Body>
        <Modal.Footer>
          <div className='modal-button-ok-cancel'>
            <div className='modal-ok' onClick={rename}>OK</div>
            <div className='modal-cancel' onClick={() => props.setShow(false)}>Cancel</div>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default RenameModal;