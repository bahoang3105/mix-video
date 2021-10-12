import { AiOutlineRedo } from "react-icons/ai";
import { connect } from "react-redux";
import { redo } from "../../../redux/actions";

const Redo = (props) => {
  const style = (props.num === 0) ? 'not-allowed' : '';
  const redoHistory = () => {
    if(props.num > 0) {
      props.redo();
    }
  }

  return (
    <div 
      className={style}
      onClick={redoHistory}
    >
      <AiOutlineRedo />
    </div>
  );
};

export default connect(
  null,
  { redo }
)(Redo);
