import ControlButton from "./controlButton";
import '../../css/left.css'
import Preview from "./preview";
import Layers from "./layers";

const LeftSidebar = () => {
  return(
    <div>
      <ControlButton className='grid-left-container'/>
      <Preview />
      <Layers />
    </div>
  );
};

export default LeftSidebar;
