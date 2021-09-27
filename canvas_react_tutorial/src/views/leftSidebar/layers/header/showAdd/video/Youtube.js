import { useState } from 'react';
import  { AiFillYoutube } from 'react-icons/ai';

const Youtube = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <AiFillYoutube />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Youtube;