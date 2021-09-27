import ImageButton from './image';
import ShapeButton from './shape';
import TextButton from './text';
import VideoButton from './video';
import AudioButton from './audio';
import ConferenceButton from './conference';
import EffectsButton from './effects';
import CommentButton from './comment';
import Group from './groupOfLayers';

const ShowAdd = (props) => {
  return (
    <div className={`show-add-button${props.display}`}>
      <TextButton curScene={props.curScene} />
      <ImageButton curScene={props.curScene} />
      <ShapeButton curScene={props.curScene} />
      <hr />
      <VideoButton curScene={props.curScene} />
      <AudioButton curScene={props.curScene} />
      <ConferenceButton curScene={props.curScene} />
      <EffectsButton curScene={props.curScene} />
      <CommentButton curScene={props.curScene} />
      <hr />
      <Group curScene={props.curScene} />
    </div>
  );
}

export default ShowAdd;