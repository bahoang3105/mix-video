import Bars from "./bars";
import '../../css/bottom.css';
import Scenes from "./scenes";
import { useState } from "react";
import Videos from "./videos";

const BottomSidebar = ({ size }) => {
  const [select, setSelect] = useState(true);
  const onSelect = card => {
    if(card === 'video') {
      setSelect(false);
    } else {
      setSelect(true);
    }
  };
  if(select) {
    return(
      <div className='bottom'>
        <Bars className='bars bottom-bars' onSelect={onSelect} size={size} />
        <Scenes size={size} />
      </div>
    );
  }
  return(
    <div className='bottom'>
      <Bars className='bars bottom-bars' onSelect={onSelect} size={size} />
      <Videos size={size} />
    </div>
  );
};

export default BottomSidebar;
