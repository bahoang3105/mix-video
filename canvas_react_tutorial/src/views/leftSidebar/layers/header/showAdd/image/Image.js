import { useState } from 'react';
import { BiImageAlt } from 'react-icons/bi';

const Image = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <BiImageAlt />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Image;