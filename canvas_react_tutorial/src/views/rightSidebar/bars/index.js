import { useState } from "react";
import Card from "./Card";
import Dropdown from "./Dropdown";

const Bars = (props) => {
  const [isSelectScenes, setIsSelectScenes] = useState(true);
  const colorScenes = isSelectScenes ? 'white' : '';
  const colorSettings = isSelectScenes ? '' : 'white';
  const onClickScenes = () => {
    setIsSelectScenes(true);
    props.isSelectScenes(true);
  }
  const onClickSettings = () => {
    setIsSelectScenes(false);
    props.isSelectScenes(false);
  }
  return (
    <div className='bars' id='right-bar'>
      <div className='dropdown-display' onClick={() => props.setDisplay(!props.display)}>  
        <Dropdown display={props.display} />
      </div>
      <div className='cards'>
        <Card name='Settings' color={colorSettings} onClick={onClickSettings} />
        <Card name='Scenes' color={colorScenes} onClick={onClickScenes} />
      </div>
    </div>
  );
};

export default Bars;
