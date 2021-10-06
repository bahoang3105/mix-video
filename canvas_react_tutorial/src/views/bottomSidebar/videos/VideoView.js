import { useEffect, useRef, useState } from "react";
import { AiOutlineDelete, AiFillFolderAdd } from "react-icons/ai";
import { BsMicFill, BsMicMuteFill } from 'react-icons/bs';
import { RiCameraFill, RiCameraOffFill } from 'react-icons/ri';
import RenameModal from "../../RenameModal";
import { addLayer, delVideoLayer, delVideo, muteMic, switchVideo, changeNameVideo } from '../../../redux/actions';
import { connect } from 'react-redux';
import { getCurScene } from "../../../redux/selectors";
import stopStream from './stopStream';

const VideoView = ({ curScene, ...props}) => {
  const [show, setShow] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.srcObject = props.src;
  });

  const deleteVideo = () => {
    stopStream(props.src);
    props.delVideoLayer(props.src);
    props.delVideo(props.id);
  }

  const rename = newName => {
    props.changeNameVideo(newName, props.id)
  }

  return (
    <div className='scene-view video-view'>
      <div  className={`video-content${props.onCamera ? '' : ' display-none'}`}>
        <video width="170" height="110" className='video' ref={videoRef} type="video/mp4" autoPlay muted>
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='buttons-video-view'>
        <div
          className='button-scene-view hover'
          onClick={() => props.muteMic(props.id)}
        >
          <BsMicFill className={props.mute ? '' : 'display-none'} />
          <BsMicMuteFill className={props.mute ? 'display-none' : ''} />
        </div>
        <div
          className='button-scene-view hover'
          onClick={() => props.switchVideo(props.id)}
        >
          <RiCameraFill className={props.onCamera ? '' : 'display-none'} />
          <RiCameraOffFill className={props.onCamera ? 'display-none' : ''} />
        </div>
        <div
          className='button-scene-view hover'
          onClick={() => props.addLayer(props.type, curScene, props)}
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
      <RenameModal show={show} setShow={setShow} name={props.name} rename={rename} />
    </div>
  );
}

const mapStateToProps = state => ({
  curScene: getCurScene(state),
});

export default connect(
  mapStateToProps,
  { addLayer, delVideo, delVideoLayer, muteMic, switchVideo, changeNameVideo }
)(VideoView);