import { connect } from "react-redux";
import { getLayerHistory, getListHistory, getNumHistory, getSceneHistory } from "../../../redux/selectors";
import Link from "./Link";
import Question from "./Question";
import Redo from "./Redo";
import Save from "./Save";
import Settings from "./Settings";
import Undo from "./Undo";
import { changeStateLayers, changeStateScenes } from "../../../redux/actions";
import { useEffect, useState } from "react";

const ControlButton = ({history, num, layer, scene, ...props}) => {
  const [redoLayer, setRedoLayer] = useState(false);
  const [redoScene, setRedoScene] = useState(false);
  useEffect(() => {
    if(layer !== 0 || redoLayer) {
      props.changeStateLayers(layer);
      setRedoLayer(false);
    }
  
    if(scene !== 0 || redoScene) {
      props.changeStateScenes(scene);
      setRedoScene(false);
    }
  }, [layer, redoLayer, scene, redoScene, props]);

  return (
    <div className={props.className}>
      <Undo history={history} num={num} layer={layer} scene={scene} />
      <Redo history={history} num={num} layer={layer} scene={scene} setRedoLayer={setRedoLayer} setRedoScene={setRedoScene} />
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

export default connect(
  mapStatetoProps,
  { changeStateLayers, changeStateScenes },
)(ControlButton);
