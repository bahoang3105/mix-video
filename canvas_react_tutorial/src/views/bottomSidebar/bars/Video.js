import { AiOutlineVideoCamera } from "react-icons/ai";

const Video = (props) => {
  return (
    <div className={props.className} onClick={props.onClick}>
      <AiOutlineVideoCamera />
      <label className='bottom-bar-label'>
        Video
      </label>
    </div>
  );
};

export default Video;
