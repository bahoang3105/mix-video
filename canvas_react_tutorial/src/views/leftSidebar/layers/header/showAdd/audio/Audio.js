import { useState } from 'react';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
const Audio = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect} flex`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <BsMusicNoteBeamed />
      <span className='space'/>
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

export default Audio;