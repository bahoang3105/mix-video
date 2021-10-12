import { useState } from "react";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock, AiOutlineMore, AiOutlineUnlock } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import DeleteModal from "../../../DeleteModal";

const Buttons = (props) => {
  const [display, setDisplay] = useState(' none');
  const [displayVisible, setDisplayVisible] = useState(false);
  const [displayLock, setDisplayLock] = useState(false);
  const [displayDel, setDisplayDel] = useState(false);
  let className = (props.display === '') ? 'none' : 'flex';
  return(
    <div id='buttons-layer'>
      <i className={className}>
        <div className={`chat-btn layer-visible${displayVisible ? '' : ' display-none'}`}>{props.hidden ? 'Show' : 'Hide'}</div>
        <span 
          className='pointer' 
          onClick={() => props.setValue('hidden')}
          onMouseOver={() => setDisplayVisible(true)}
          onMouseOut={() => setDisplayVisible(false)}  
        >
          <AiOutlineEye style={{ display: props.hidden ? 'none' : ''}} />
          <AiOutlineEyeInvisible style={{ display: props.hidden ? '' : 'none' }} />
        </span>
        <span className='space' />
        <div className={`chat-btn layer-lock${displayLock ? '' : ' display-none'}`}>{props.lock ? 'Unlock' : 'Lock'}</div>
        <span
          className='pointer'
          onClick={() => props.setValue('lock')}
          onMouseOver={() => setDisplayLock(true)}
          onMouseOut={() => {setDisplayLock(false)}}  
        >
          <AiOutlineUnlock style={{ display: props.lock ? 'none' : ''}} />
          <AiOutlineLock style={{ display: props.lock ? '' : 'none'}} />
        </span>
        <span className='space' />
        <div className={`chat-btn layer-delete${displayDel ? '' : ' display-none'}`}>Delete</div>
        <span 
          className='pointer' 
          onClick={() => props.setShowDelete(true)}
          onMouseOver={() => setDisplayDel(true)}
          onMouseOut={() => setDisplayDel(false)}  
        >
          <AiOutlineDelete />
        </span>
        <DeleteModal setShowDelete={props.setShowDelete} showDelete={props.showDelete} onClickDeleteOK={props.onClickDeleteOK} />
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
          <BiCopy />&nbsp;Duplicate
        </div>
      </div>
    </div>
  );
};

export default Buttons;