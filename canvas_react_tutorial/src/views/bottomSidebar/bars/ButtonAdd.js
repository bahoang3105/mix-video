import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { addScene, addVideo } from '../../../redux/actions';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Camera from "./addVideoButtons.js/Camera";
import Invite from "./addVideoButtons.js/Invite";
import Screen from "./addVideoButtons.js/Screen";

const ButtonAdd = (props) => {
  const [color, setColor] = useState('bottom-inactive');
  const addEvent = () => {
    if(props.name === 'scene') {
      props.addScene();
    } else {
      props.addVideo('hiih');
    }
  }
  const [show, setShow] = useState(false);
  if(props.name === 'scene') {
    return(
      <div
        className={`${props.className} ${color}`}
        onMouseOver={() => setColor('bottom-active')}
        onMouseOut={() => setColor('bottom-inactive')}
        onClick={addEvent}
      >
        <AiOutlinePlusCircle />
          <label className='bottom-bar-label'>
            Add {props.name}
          </label>
      </div>
    );
  }
  return(
    <>
    <div
      className={`${props.className} ${color}`}
      onMouseOver={() => setColor('bottom-active')}
      onMouseOut={() => setColor('bottom-inactive')}
      onClick={() => setShow(true)}
    >
      <AiOutlinePlusCircle />
      <label className='bottom-bar-label'>
        Add {props.name}
      </label>
    </div>
    <Modal
      show={show}
      onHide={() =>setShow(false)}
      backdrop={true}
      className='modal modal-video-add'
    >
      <div className='border-modal'>
        <Modal.Header>
          <span className='x-close close-video' onClick={() => setShow(false)}>x</span>
          <Modal.Title>Add Video</Modal.Title>
        </Modal.Header>
        <Modal.Body className='choose-add-video'>
          <Camera />
          <Screen />
          <Invite />
        </Modal.Body>
      </div>
    </Modal>
    </>
  );
};

export default connect(
  null,
  { addVideo, addScene }
)(ButtonAdd);
