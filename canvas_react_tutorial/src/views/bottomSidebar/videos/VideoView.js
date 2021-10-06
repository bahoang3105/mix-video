import { useEffect, useRef, useState } from "react";
import { AiOutlineCamera, AiOutlineDelete, AiFillFolderAdd } from "react-icons/ai";
import { BsMicFill, BsMicMuteFill } from 'react-icons/bs';
import RenameModal from "../../RenameModal";
import { addLayer, delVideoLayer, delVideo } from '../../../redux/actions';
import { connect } from 'react-redux';
import { getCurScene } from "../../../redux/selectors";
import stopStream from './stopStream';

const VideoView = ({ curScene, addLayer, delVideo, delVideoLayer, ...props}) => {
  const [show, setShow] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.srcObject = props.src;
  });

  const deleteVideo = () => {
    stopStream(props.src);
    delVideoLayer(props.src);
    delVideo(props.id);
  }

  return (
    <div className='scene-view video-view'>
      <div  className={`video-content${!props.camera ? '' : ' display-none'}`}>
        <video width="170" height="110" className='video' ref={videoRef} type="video/mp4" autoPlay muted>
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='buttons-video-view'>
        <div
          className='button-scene-view hover'
        >
          <BsMicFill className={props.micro ? '' : 'display-none'}/>
          <BsMicMuteFill className={props.micro ? 'display-none' : ''} />
        </div>
        <div
          className='button-scene-view hover'
        >
          <AiOutlineCamera />
        </div>
        <div
          className='button-scene-view hover'
          onClick={() => addLayer(props.type, curScene, props)}
        >
          <AiFillFolderAdd />
        </div>
        <div
          className='button-scene-view hover'
          onClick={deleteVideo}
        >
          <AiOutlineDelete />
        </div>
      </div>
      <span className='name-video-view' onDoubleClick={() => setShow(true)}>
        {props.name}
      </span>
      <RenameModal show={show} setShow={setShow} name={props.name} />
    </div>
  );
}

const mapStateToProps = state => ({
  curScene: getCurScene(state),
});

export default connect(
  mapStateToProps,
  { addLayer, delVideo, delVideoLayer }
)(VideoView);