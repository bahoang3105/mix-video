import { useState } from 'react';
import { AiOutlineOrderedList } from 'react-icons/ai';

const Chain = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <AiOutlineOrderedList />
      <span  className='space' />
      {props.name}
    </div>
  );
}

export default Chain;