import { useState } from 'react';
import { BiMoney } from 'react-icons/bi';

const Prize = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <BiMoney />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Prize;