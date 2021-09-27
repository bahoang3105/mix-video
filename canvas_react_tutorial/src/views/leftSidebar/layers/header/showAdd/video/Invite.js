import { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';

const Invite = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <AiOutlineUserAdd />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Invite;