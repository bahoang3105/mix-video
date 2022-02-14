import { useEffect, useRef } from "react";

const AudioTag = (props) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if(props.data.start) {
      if(!props.data.pause) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  });
  
  return (
    <div className='display-none'>
      <audio
        ref={audioRef}
        src={props.data.src}
        muted={props.data.mute}
        volume={props.data.volume/100}
        loop={props.data.loop}
      />
    </div>
  );
}

export default AudioTag;