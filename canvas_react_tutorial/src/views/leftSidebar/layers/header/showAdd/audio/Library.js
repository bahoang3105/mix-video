import { useState } from "react";
import { BsMusicNoteList } from "react-icons/bs";

const Library = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
    >
      <BsMusicNoteList />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default Library;