import { useState } from "react";
import ButtonAdd from "./ButtonAdd";
import Scene from "./Scene";
import Video from "./Video";

const Bars = (props) => {
  const [nameAdd, setNameAdd] = useState('scene');
  const [cssSelect, setCssSelect] = useState(true);
  const onClickScene = () => {
    setNameAdd('scene');
    props.onSelect('scene');
    setCssSelect(true);
  }
  const onClickVideo = () => {
    setNameAdd('video');
    props.onSelect('video');
    setCssSelect(false);
  }
  const selectScene = cssSelect ? ' on-select bottom-active' : '';
  const selectVideo = cssSelect ? '' : ' on-select  bottom-active';

  return (
    <div className={props.className}>
      <Scene className={`scene-video-card${selectScene}`} onClick={() => onClickScene()}/>
      <Video className={`scene-video-card${selectVideo}`} onClick={() => onClickVideo()}/>
      <ButtonAdd className='button-add' name={nameAdd} margin={props.size.width - 250} />
    </div>
  );
};

export default Bars;
