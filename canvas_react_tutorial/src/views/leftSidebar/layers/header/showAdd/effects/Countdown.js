import { useState } from 'react';
import { BiTime } from 'react-icons/bi';

const Countdown = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <BiTime />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Countdown;