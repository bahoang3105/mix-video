import Link from "./Link";
import Question from "./Question";
import Redo from "./Redo";
import Save from "./Save";
import Settings from "./Settings";
import Undo from "./Undo";

const ControlButton = (props) => {
  return (
    <div className={props.className}>
      <Undo />
      <Redo />
      <Settings />
      <Save />
      <Link />
      <Question />
    </div>
  );
};

export default ControlButton;
