import { useState } from 'react';
import { BiMicrophone } from 'react-icons/bi';

const Micro = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <BiMicrophone />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Micro;