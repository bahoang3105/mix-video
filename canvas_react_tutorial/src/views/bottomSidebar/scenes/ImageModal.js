import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const ImageModal = (props) => {
  const [url, setUrl] = useState('');
  
  const updateImage = () => {
    props.updateImage(url);
    props.setShowImage(false);
    setUrl('');
  }

  const hide = () => {
    props.setShowImage(false);
    setUrl('');
  }

  return (
    <Modal
      show={props.showImage}
      onHide={hide}
      backdrop={true}
      className='modal'
    >
      <div className='border-modal'>
        <Modal.Header>
          <span className='x-close close-video' onClick={hide}>x</span>
          <Modal.Title>
            Upload Background Scene
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='title-rename'>
            Please enter link image here
          </div>
          <input type='text' value={url} onChange={e => setUrl(e.target.value)} className='input-rename' />
        </Modal.Body>
        <Modal.Footer>
          <div className='modal-button-ok-cancel'>
            <div className='modal-ok' onClick={updateImage}>OK</div>
            <div className='modal-cancel' onClick={hide}>Cancel</div>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default ImageModal;