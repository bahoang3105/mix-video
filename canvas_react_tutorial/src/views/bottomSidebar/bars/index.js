import ButtonAdd from "./ButtonAdd";
import Scene from "./Scene";
import Video from "./Video";

const Bars = (props) => {
  return (
    <div className={props.className}>
      <Scene className='scene-video-card'/>
      <Video className='scene-video-card'/>
      <ButtonAdd className='button-add' name='scene'/>
    </div>
  );
};

export default Bars;
