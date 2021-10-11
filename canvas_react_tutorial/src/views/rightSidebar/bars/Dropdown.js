import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";

const Dropdown = (props) => {
  return (
    <div id='right-dropdown'>
      <AiOutlineDown style={{ display: props.display ? '' : 'none'}} />
      <AiOutlineRight style={{ display: props.display ? 'none' : '' }} />
    </div>
  );
};

export default Dropdown;