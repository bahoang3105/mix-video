import { useState } from 'react';
import  { ImFileVideo } from 'react-icons/im';

const Library = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <ImFileVideo />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Library;