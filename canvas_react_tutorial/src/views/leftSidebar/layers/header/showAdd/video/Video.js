import { useState } from 'react';
import { AiTwotoneVideoCamera } from 'react-icons/ai';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

const Video = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons flex${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
      style={{ cursor: 'default' }}
    >
      <AiTwotoneVideoCamera />
      <span className='space' />
      {props.name}
      <div className={isSelect === '' ? 'arrow-select' : 'none-arrow'}>
        <IoMdArrowDropright />
      </div>
      <div className={isSelect === '' ? 'none-arrow' : 'arrow-select'}>
        <IoMdArrowDropleft />
      </div>
    </div>
  );
}

export default Video;