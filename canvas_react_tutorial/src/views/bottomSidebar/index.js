import Bars from "./bars";
import '../../css/bottom.css';
import Scenes from "./scenes";
import { useState } from "react";
import Videos from "./videos";

const BottomSidebar = () => {
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
      <div>
        <Bars className='bars bottom-bars' onSelect={onSelect}/>
        <Scenes />
      </div>
    );
  }
  return(
    <div>
      <Bars className='bars bottom-bars' onSelect={onSelect}/>
      <Videos />
    </div>
  );
};

export default BottomSidebar;
