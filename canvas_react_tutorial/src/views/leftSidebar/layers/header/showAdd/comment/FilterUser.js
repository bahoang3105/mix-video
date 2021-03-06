import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

const FilterUser = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <AiOutlineUser />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default FilterUser;