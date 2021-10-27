import { useState } from 'react';
import { GrInternetExplorer } from 'react-icons/gr';

const RTMP = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <GrInternetExplorer />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default RTMP;