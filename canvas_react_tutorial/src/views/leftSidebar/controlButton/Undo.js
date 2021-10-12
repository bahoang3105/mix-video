import { AiOutlineUndo } from 'react-icons/ai';
import { connect } from 'react-redux';
import { undo } from '../../../redux/actions';

const Undo = (props) => {
  const style = (props.history.length - props.num <= 0) ? 'not-allowed' : '';
  const undoHistory = () => {
    if(props.history.length - props.num > 0) {
      props.undo();
    }
  }

  return (
    <div
      className={style}
      onClick={undoHistory}  
    >
      <AiOutlineUndo />
    </div>
  );
};

export default connect(
  null,
  { undo }
)(Undo);
