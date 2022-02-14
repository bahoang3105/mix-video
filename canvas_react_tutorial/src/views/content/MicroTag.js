import { useEffect, useRef } from "react";

const MicroTag = (props) => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.srcObject = props.data.src;
    audioRef.current.autoplay = true;
  });
  
  return (
    <div className='display-none'>
      <audio
        ref={audioRef}
        muted={props.data.mute}
        volume={props.data.volume/100}
      />
    </div>
  );
}

export default MicroTag;