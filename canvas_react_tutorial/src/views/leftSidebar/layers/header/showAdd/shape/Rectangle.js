import { useState } from 'react';
import { BsSquareFill } from 'react-icons/bs';

const Rectangle = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <BsSquareFill />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Rectangle;