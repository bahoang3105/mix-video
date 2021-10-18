import ImageButton from './image';
import ShapeButton from './shape';
import TextButton from './text';
import VideoButton from './video';
import AudioButton from './audio';
import ConferenceButton from './conference';
import EffectsButton from './effects';
import CommentButton from './comment';
import Group from './groupOfLayers';
import { connect } from 'react-redux';
import { addLayer } from '../../../../../redux/actions';

const ShowAdd = (props) => {
  const addLayer = (type) => {
    props.addLayer(type, props.curScene)
  }
  return (
    <div className={`show-add-button${props.display}`}>
      <TextButton curScene={props.curScene} addLayer={addLayer} />
      <ImageButton curScene={props.curScene} setShow={props.setShowImage} setShowUpload={props.setShowUploadImage} />
      <ShapeButton curScene={props.curScene} addLayer={addLayer} />
      <hr />
      <VideoButton curScene={props.curScene} addLayer={addLayer} setShowCamera={props.setShowCamera} setShowYoutube={props.setShowYoutube} setShowUploadVideo={props.setShowUploadVideo} />
      <AudioButton curScene={props.curScene} addLayer={addLayer} setShowMicro={props.setShowMicro} setShowUploadAudio={props.setShowUploadAudio} />
      <ConferenceButton curScene={props.curScene} addLayer={addLayer} />
      <EffectsButton curScene={props.curScene} addLayer={addLayer} />
      <CommentButton curScene={props.curScene} addLayer={addLayer} />
      <hr />
      <Group curScene={props.curScene} addLayer={addLayer} />
    </div>
  );
}

export default connect(
  null,
  { addLayer }
)(ShowAdd);