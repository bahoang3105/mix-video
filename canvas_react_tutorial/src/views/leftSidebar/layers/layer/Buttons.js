import { useState } from "react";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock, AiOutlineMore, AiOutlineUnlock } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import DeleteModal from "../../../DeleteModal";

const Buttons = (props) => {
  const [display, setDisplay] = useState(' none')
  let className = (props.display === '') ? 'none' : 'flex';
  return(
    <div id='buttons-layer'>
      <i className={className}>
        <span className='pointer' onClick={() => props.setValue('hidden')}>
          <AiOutlineEye style={{ display: props.hidden ? 'none' : ''}} />
          <AiOutlineEyeInvisible style={{ display: props.hidden ? '' : 'none' }} />
        </span>
        <span className='space' />
        <span className='pointer' onClick={() => props.setValue('lock')}>
          <AiOutlineUnlock style={{ display: props.lock ? 'none' : ''}} />
          <AiOutlineLock style={{ display: props.lock ? '' : 'none'}} />
        </span>
        <span className='space' />
        <span className='pointer' onClick={() => props.setShowDelete(true)}>
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