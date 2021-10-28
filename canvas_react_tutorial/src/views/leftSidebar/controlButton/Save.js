import { AiOutlineSave } from "react-icons/ai";
import { connect } from "react-redux";
import {
  getListLayer,
  getListScene,
  getNumLayer,
  getNumScene,
} from '../../../redux/selectors';

const Save = ({ layers, scenes, numLayer, numScene, setDisplayNoti}) => {
  const save = () => {
    const saveLayer = [];
    for(let i = 0; i < layers.length; i++) {
      if(layers[i].type !== 'camera' && layers[i].type !== 'screen' && layers[i].type !== 'micro' && layers[i].type !== 'video' && layers[i].type !== 'imageUpload' && layers[i].type !== 'rtmp') {
        if(layers[i].type === 'youtube' || layers[i].type === 'video' || layers[i].type === 'audio') {
          saveLayer.push({
            ...layers[i],
            start: false,
            pause: true,
          });
        } else {
          saveLayer.push(layers[i]);
        }
      }
    }
    localStorage.setItem('layers', JSON.stringify(saveLayer));
    localStorage.setItem('scenes', JSON.stringify(scenes));
    localStorage.setItem('numLayer', numLayer);
    localStorage.setItem('numScene', numScene);
    setDisplayNoti(true);
    setTimeout(() => {
      setDisplayNoti(false);
    }, 3000);
  }

  return (
    <div onClick={save} className='control-button'>
      <AiOutlineSave />
    </div>
  );
};

const mapStateToProps = state => ({
  layers: getListLayer(state),
  scenes: getListScene(state),
  numLayer: getNumLayer(state),
  numScene: getNumScene(state),
});

export default connect(mapStateToProps)(Save);
