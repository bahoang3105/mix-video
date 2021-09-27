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
      <TextButton />
      <ImageButton />
      <ShapeButton />
      <hr />
      <VideoButton />
      <AudioButton />
      <ConferenceButton />
      <EffectsButton />
      <CommentButton />
      <hr />
      <Group />
    </div>
  );
}

export default ShowAdd;