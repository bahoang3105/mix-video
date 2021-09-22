import Bars from "./bars";
import '../../css/right.css';
import Settings from "./settings";
import Scenes from "./scenes";
const RightSidebar = () => {
  return(
    <div className='right'>
      <Bars />
      <Settings />
      <Scenes />
    </div>
  );
};

export default RightSidebar;
