import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { addLayer } from '../../../../redux/actions';
import { keyYoutube } from '../../../content/YoutubeIframe';
const YoutubeModal = (props) => {
  const [src, setSrc] = useState('');
  const addYoutubeLayer = () => {
    const check = keyYoutube(src);
    if(check !== false) {
      props.addLayer('youtube', props.curScene, { name: 'Video from Youtube ', src: src });
      props.setShow(false);
    } else {
      alert("It's not a youtube link!");
    }
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
            Add video from Youtube
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='title-rename'>
            Please parse link Youtube here
          </div>
          <input type='text' value={src} onChange={e => setSrc(e.target.value)} className='input-rename' />
        </Modal.Body>
        <Modal.Footer>
          <div className='modal-button-ok-cancel'>
            <div className='modal-ok' onClick={addYoutubeLayer}>OK</div>
            <div className='modal-cancel' onClick={() => props.setShow(false)}>Cancel</div>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default connect(
  null,
  { addLayer }
)(YoutubeModal);