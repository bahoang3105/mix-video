import { useState } from 'react';
import { AiOutlineLock } from 'react-icons/ai';

const ButtonLock = (props) => {
  const [display, setDisplay] = useState(false);
  return(
    <div 
      style={{ color: props.lock ? 'black' : 'gray' }} 
      id='left-lock'
      onClick={() => props.setLock(!props.lock)}
      onMouseOver={() => setDisplay(true)}
      onMouseOut={() => setDisplay(false)}
    >
      <div className={`chat-btn${display ? '' : ' display-none'}`} id='lock-left'>{props.lock ? 'Show the layers are locked' : 'Hide the layers are locked'}</div>
      <AiOutlineLock />
    </div>
  );
};

export default ButtonLock;