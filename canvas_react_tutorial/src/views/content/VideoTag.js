import { useEffect, useRef } from "react";

const VideoTag = (props) => {
  const videoRef = useRef(null);
  const zIndex = (props.curLayer === props.data.num) ? 10 : 0;

  useEffect(() => {
    if(props.data.start) {
      if(!props.data.pause) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  });

  const render = () => {
    return (
      <div 
        style={{
          opacity: props.data.opacity, 
          zIndex: -1, 
          display: props.data.hidden ? 'none' : '' , 
          filter: `brightness(${props.data.brightness}) contrast(${props.data.contrast}) blur(${props.data.blur}px) saturate(${props.data.saturate})`,
        }} 
      >
        <video
          ref={videoRef}
          src={props.data.src}
          muted={props.data.mute}
          volume={props.data.volume/100}
          width={props.data.width}
          height={props.data.height}
          loop={props.data.loop}
          controls={false}
        />
      </div>
    );
  }

  return (
    <div 
      style={{
        position: 'absolute',
        marginLeft: props.data.x + 'px',
        marginTop: props.data.y + 'px',
        zIndex: zIndex,
      }}
    >
      {render()}
    </div>
  );
}

export default VideoTag;
