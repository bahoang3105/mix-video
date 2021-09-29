import { useState } from "react";
import { AiOutlineDelete, AiOutlineEye, AiOutlineMore, AiOutlineUnlock } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import Modal from 'react-bootstrap/Modal';

const Buttons = (props) => {
  const [display, setDisplay] = useState(' none')
  let className = (props.display === '') ? 'none' : 'flex';
  return(
    <div id='buttons-layer'>
      <i className={className}>
        <span className='pointer' >
          <AiOutlineEye />
        </span>
        <span className='space' />
        <span className='pointer' >
          <AiOutlineUnlock />
        </span>
        <span className='space' />
        <span className='pointer' onClick={() => props.setShowDelete(true)}>
          <AiOutlineDelete />
        </span>
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
      </i>
      <div
        className='more-button-left'
        onMouseOver={() => setDisplay('')}
        onMouseOut={() => setDisplay(' none')}
      >
        <AiOutlineMore />
        <span className='space' />
        <span className='space' />
        <div 
          className={`duplicate-button${display}`}
          onMouseMove={() => setDisplay(' on-select-duplicate')}
          onClick={props.duplicate}
        >
          <BiCopy />
          &nbsp;&nbsp;Duplicate
        </div>
      </div>
    </div>
  );
};

export default Buttons;