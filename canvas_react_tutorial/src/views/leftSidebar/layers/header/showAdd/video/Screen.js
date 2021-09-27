import { useState } from 'react';
import { GoScreenFull } from 'react-icons/go';

const Screen = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <GoScreenFull />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Screen;