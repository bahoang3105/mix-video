import { useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { addLayer } from "../../../../redux/actions";

const ImageAdd = (props) => {
  const [link, setLink] = useState('');
  
  const getDetail = (url, callback) => {
    const img = new Image();
    img.src = url;
    img.onload = () => { callback(img.width, img.height); }
  }

  const closeModal = () => {
    setLink('');
    props.setShow(false);
  }

  const addImage = () => {
    getDetail(
      link,
      (width, height) => {
        props.addLayer('image', props.curScene, {link: link, width: width, height: height}); 
      }
    );
    setLink('');
    props.setShow(false);
  }
  
  return (
    <Modal
      show={props.show}
      onHide={closeModal}
      backdrop={true}
      className='modal'
    >
      <div className='border-modal'>
        <Modal.Header>
          <span className='x-close close-add-image' onClick={closeModal}>x</span>
          <Modal.Title>
            Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='info-add-image'>
            Add image by URL
          </div>
          <input type='text' className='input-url' value={link} onChange={e => setLink(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <div className='modal-button-ok-cancel'>
            <div className='modal-ok' onClick={addImage}>Add</div>
            <div className='modal-cancel' onClick={closeModal}>Cancel</div>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default connect(
  null,
  { addLayer }
)(ImageAdd);