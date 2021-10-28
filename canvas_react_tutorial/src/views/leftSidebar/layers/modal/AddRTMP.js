import { useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { addStream } from "../../../../redux/actions";

const AddRTMP = (props) => {
  const [link, setLink] = useState('');

  const closeModal = () => {
    setLink('');
    props.setShow(false);
  }

  const addStream = () => {
    const regex = /^rtmp(s?):\/\/([^/s]+)\/([^/s]+)\/([^/s]+)$/;
    if(regex.test(link)) {
      props.addStream(link, props.curScene);
      setLink('');
      props.setShow(false);
    } else {
      alert('Invalid link, please try again!');
    }
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
            From another stream
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='info-add-image'>
            Add stream by this rtmp url
          </div>
          <input type='text' className='input-url' value={link} onChange={e => setLink(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <div className='modal-button-ok-cancel'>
            <div className='modal-ok' onClick={addStream}>Add</div>
            <div className='modal-cancel' onClick={closeModal}>Cancel</div>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default connect(
  null,
  { addStream }
)(AddRTMP);