import { useState } from 'react';
import { BiGift } from 'react-icons/bi';

const VirtualGift = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <BiGift />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default VirtualGift;