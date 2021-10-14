import { useState } from 'react';
import { AiOutlineLink } from 'react-icons/ai';

const FromURL = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
      onClick={() => props.setShow(true)}
    >
      <AiOutlineLink />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default FromURL;