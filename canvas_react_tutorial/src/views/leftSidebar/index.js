import ControlButton from "./controlButton";
import '../../css/left.css'
import Preview from "./preview";
import Layers from "./layers";

const LeftSidebar = (props) => {
  return(
    <div>
      <ControlButton className='grid-left-container'/>
      <Preview size={props.size}/>
      <Layers />
    </div>
  );
};

export default LeftSidebar;
