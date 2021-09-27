import { useState } from 'react';
import { ImFilter } from 'react-icons/im';

const Filter = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <ImFilter />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Filter;