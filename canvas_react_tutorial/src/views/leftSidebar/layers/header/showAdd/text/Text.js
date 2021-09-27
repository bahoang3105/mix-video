import { useState } from 'react';
import { BiText } from 'react-icons/bi';

const Text = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <BiText />
      <span className='space' />
      {props.name}
    </div>
  );
};

export default Text;
