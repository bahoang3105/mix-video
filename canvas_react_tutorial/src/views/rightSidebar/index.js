import Bars from "./bars";
import '../../css/right.css';
import Settings from "./settings";
import Scenes from "./scenes";
import { useState } from "react";

const RightSidebar = () => {
  const [select, setSelect] = useState(true);
  const renderScenes = isScenes => {
    setSelect(isScenes);
  };
  if(select) {
    return(
      <div className='right'>
        <Bars isSelectScenes={renderScenes}/>
        <Scenes />
      </div>
    );
  }
  return(
    <div className='right'>
      <Bars isSelectScenes={renderScenes}/>
      <Settings />
    </div>
  );
};

export default RightSidebar;
