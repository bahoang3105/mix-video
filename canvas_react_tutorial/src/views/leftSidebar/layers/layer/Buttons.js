import { useState } from "react";
import { AiOutlineDelete, AiOutlineEye, AiOutlineMore, AiOutlineUnlock } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";

const Buttons = (props) => {
  const [display, setDisplay] = useState(' none')
  const className = (props.display === '') ? 'none' : 'flex';
  return(
    <div id='buttons-layer'>
      <i className={className}>
        <AiOutlineEye />
        <span className='space' />
        <AiOutlineUnlock />
        <span className='space' />
        <AiOutlineDelete />
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
        >
          <BiCopy />
          &nbsp;&nbsp;Duplicate
        </div>
      </div>
    </div>
  );
};

export default Buttons;