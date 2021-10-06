import { useEffect, useRef } from "react";

const Video = (props) => {
  const videoRef = useRef(null);
  useEffect(() => {
    videoRef.current.srcObject = props.data.src;
  });

  const style = (props.curLayer.num === props.data.num) ? 'on-select-layer' : '';
  
  return (
    <div 
      style={{ 
        position: 'absolute', 
        width: props.data.width + 'px', 
        height: props.data.height + 'px', 
        left: props.data.x + 'px', 
        top: props.data.y + 'px',
        opacity: props.data.opacity,
      }}
    >
      <video id={style} width='auto' height='100%'className='video' ref={videoRef} type="video/mp4" autoPlay muted>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Video;