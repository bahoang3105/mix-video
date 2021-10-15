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
  const [displayNoti, setDisplayNoti] = useState(false);
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
    <>
      <div className={props.className}>
        <Undo history={history} num={num} layer={layer} scene={scene} />
        <Redo history={history} num={num} layer={layer} scene={scene} setRedoLayer={setRedoLayer} setRedoScene={setRedoScene} />
        <Settings />
        <Save setDisplayNoti={setDisplayNoti} />
        <Link />
        <Question />
      </div>
      <div className='save-noti' style={{ display: displayNoti ? 'inline-block' : 'none'}}>
      <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className='tick-icon' 
          id="img" 
          viewBox="0 0 16 16" 
          fill="none"
        >
          <path
            fillRule="evenodd" 
            clipRule="evenodd"
            d="M0.800049 7.9998C0.800049 4.02647 4.02672 0.799805 8.00005 0.799805C11.9734 0.799805 15.2 4.02647 15.2 7.9998C15.2 11.9731 11.9734 15.1998 8.00005 15.1998C4.02672 15.1998 0.800049 11.9731 0.800049 7.9998ZM11.8466 6.45682C12.0468 6.26511 12.0517 5.94944 11.8576 5.75174C11.6635 5.55404 11.3439 5.54918 11.1437 5.74089L6.68932 10.007L4.8563 8.25147C4.65614 8.05977 4.33652 8.06462 4.14242 8.26232C3.94832 8.46002 3.95323 8.7757 4.1534 8.96741L6.33787 11.0596C6.53369 11.2471 6.84494 11.2471 7.04077 11.0596L11.8466 6.45682Z"
            fill="#00D254"
          />
        </svg>
        <div className='successfully'>Successfully</div>
        <div id='successfully'>Save Project Successfully</div>
      </div>
    </>
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
