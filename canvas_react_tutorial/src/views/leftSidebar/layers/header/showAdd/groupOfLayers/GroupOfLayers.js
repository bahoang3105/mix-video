import { useState } from 'react';
import { GrObjectUngroup } from 'react-icons/gr';

const GroupOfLayers = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <GrObjectUngroup />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default GroupOfLayers;