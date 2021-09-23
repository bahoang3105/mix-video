import { AiOutlineDelete, AiOutlineEye, AiOutlineMore, AiOutlineUnlock } from "react-icons/ai";

const Buttons = (props) => {
  const className = (props.display === '') ? 'none' : 'flex';
  return(
    <div id='buttons-layer'>
      <i className={className}>
        <AiOutlineEye />
        <span className='space' />
        <AiOutlineUnlock />
        <span className='space' />
        <AiOutlineDelete />
      </i>
      <AiOutlineMore />
    </div>
  );
};

export default Buttons;