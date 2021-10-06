import { useState } from 'react';
import { AiOutlinePushpin } from 'react-icons/ai';

const Pin = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons not-allowed${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <AiOutlinePushpin />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Pin;