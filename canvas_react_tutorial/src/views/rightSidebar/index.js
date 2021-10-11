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
  const [display, setDisplay] = useState(true);
  if(select) {
    return(
      <div className='right'>
        <Bars isSelectScenes={renderScenes} setDisplay={setDisplay} display={display} />
        <Scenes display={display} />
      </div>
    );
  }
  return(
    <div className='right'>
      <Bars isSelectScenes={renderScenes} setDisplay={setDisplay} display={display} />
      <Settings display={display} />
    </div>
  );
};

export default RightSidebar;
