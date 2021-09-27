import { useState } from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';

const Triangle = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <BsFillTriangleFill />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Triangle;