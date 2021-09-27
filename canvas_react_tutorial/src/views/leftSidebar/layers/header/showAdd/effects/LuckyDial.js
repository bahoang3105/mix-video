import { useState } from 'react';
import { AiFillGift } from 'react-icons/ai';

const LuckyDial = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <AiFillGift />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default LuckyDial;