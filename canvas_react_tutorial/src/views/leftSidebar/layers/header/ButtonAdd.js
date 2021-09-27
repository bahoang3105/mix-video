import { AiOutlinePlusCircle } from "react-icons/ai";
import ShowAdd from './showAdd';
import { useState } from 'react';
const ButtonAdd = () => {
  const [displayAdd, setDisplayAdd] = useState(' none');
  return(
    <div
      id='left-add'
      onMouseOver={() => setDisplayAdd('')}
      onMouseOut={() => setDisplayAdd(' none')}
    >
      <AiOutlinePlusCircle />
      <span className='space' />
      <ShowAdd display={displayAdd}/>
    </div>
  );
};

export default ButtonAdd;