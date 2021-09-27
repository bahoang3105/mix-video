import { useState } from 'react';
import { FcConferenceCall } from 'react-icons/fc';

const Conference = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <FcConferenceCall />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Conference;