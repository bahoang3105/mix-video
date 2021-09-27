import { useState } from 'react';
import { ImSortNumericAsc } from 'react-icons/im';

const Count = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <ImSortNumericAsc />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Count;