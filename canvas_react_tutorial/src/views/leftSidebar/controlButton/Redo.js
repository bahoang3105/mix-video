import { AiOutlineRedo } from "react-icons/ai";
import { connect } from "react-redux";
import { redo } from "../../../redux/actions";

const Redo = (props) => {
  const style = (props.num === 0) ? 'not-allowed' : 'pointer';
  const redoHistory = () => {
    if(props.num > 0) {
      props.redo();
    }
    if(props.layer === 1) {
      props.setRedoLayer(true);
    }
    if(props.scene === 1) {
      props.setRedoScene(true);
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
