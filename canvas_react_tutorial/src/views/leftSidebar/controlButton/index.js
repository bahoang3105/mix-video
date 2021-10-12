import { connect } from "react-redux";
import { getLayerHistory, getListHistory, getNumHistory, getSceneHistory } from "../../../redux/selectors";
import Link from "./Link";
import Question from "./Question";
import Redo from "./Redo";
import Save from "./Save";
import Settings from "./Settings";
import Undo from "./Undo";

const ControlButton = ({history, num, layer, scene, ...props}) => {
  console.log('history: ', history)
  console.log('num: ', num)
  console.log('layer: ', layer)
  console.log('scene: ', scene)
  return (
    <div className={props.className}>
      <Undo history={history} num={num} layer={layer} scene={scene} />
      <Redo history={history} num={num} layer={layer} scene={scene} />
      <Settings />
      <Save />
      <Link />
      <Question />
    </div>
  );
};

const mapStatetoProps = state => ({
  history: getListHistory(state),
  num: getNumHistory(state),
  layer: getLayerHistory(state),
  scene: getSceneHistory(state),
});

export default connect(mapStatetoProps)(ControlButton);
