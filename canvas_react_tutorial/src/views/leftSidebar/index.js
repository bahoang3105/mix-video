import ControlButton from "./controlButton";
import '../../css/left.css'
import Preview from "./preview";

const LeftSidebar = () => {
  return(
    <div>
      <ControlButton className='grid-left-container'/>
      <Preview />
    </div>
  );
};

export default LeftSidebar;
