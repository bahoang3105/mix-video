import { useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';

const Camera = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <AiOutlineCamera />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Camera;