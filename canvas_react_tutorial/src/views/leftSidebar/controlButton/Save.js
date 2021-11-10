import { AiOutlineSave } from "react-icons/ai";
import { connect } from "react-redux";
import axios from 'axios';
import BaseUrl from "../../../BaseUrl";
import {
  getListLayer,
  getListScene,
  getNumLayer,
  getNumScene,
} from '../../../redux/selectors';

const Save = ({ layers, scenes, numLayer, numScene, setDisplayNoti}) => {
  const save = async () => {
    const saveLayer = [];
    for(let i = 0; i < layers.length; i++) {
      if(layers[i].type !== 'camera' && layers[i].type !== 'screen' && layers[i].type !== 'micro' && layers[i].type !== 'rtmp' && layers[i].type !== 'video') {
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
    await axios.put(BaseUrl + '/app/save', {
      layers: saveLayer,
      scenes,
      numLayer,
      numScene,
    }, {
      headers: {
        'secret-key': localStorage.getItem('secretKey')
      }
    });
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
