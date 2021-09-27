import { useState } from 'react';
import { AiFillDribbbleCircle } from 'react-icons/ai';

const Circle = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <AiFillDribbbleCircle />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Circle;