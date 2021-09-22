import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ButtonAdd = (props) => {
  const [color, setColor] = useState('bottom-inactive');
  return(
    <div
      className={`${props.className} ${color}`}
      onMouseOver={() => setColor('bottom-active')}
      onMouseOut={() => setColor('bottom-inactive')}
    >
      <AiOutlinePlusCircle />
      <label className='bottom-bar-label'>
        Add {props.name}
      </label>
    </div>
  );
};

export default ButtonAdd;
