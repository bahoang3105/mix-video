import { useRef, useState } from "react";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import RenameModal from "../../RenameModal";
import getUserMedia from "./getUserMedia";

const VideoView = (props) => {
  const [show, setShow] = useState(false);
  const [camera, setCamera] = useState(false);
  const videoRef = useRef(null);

  const getVideo = async (camera, microphone) => {
    const stream = await getUserMedia(camera, microphone);
    videoRef.current.srcObject = stream;
  }

  getVideo(props.info.camera, props.info.micro);

  return (
    <div className={`scene-view video-view${camera ? '' : ' black-background'}`}>
      <div  className='video-content'>
        <video width="170" height="110" className='video' ref={videoRef} type="video/mp4" autoPlay muted>
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='buttons-scene-view'>
        <div
          className={`button-scene-view`}
          // onMouseOver={() => setCamera(' over-mouse')}
          // onMouseOut={() => setCamera('')}
        >
          <AiOutlineCamera />
        </div>
        <div
          className={`button-scene-view`}
          // onMouseOver={() => setCopy(' over-mouse')}
          // onMouseOut={() => setCopy('')}
        >
          <BiCopy />
        </div>
        <div
          className={`button-scene-view`}
          // onMouseOver={() => setDel(' over-mouse')}
          // onMouseOut={() => setDel('')}
          // onClick={delScene}
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

export default VideoView;