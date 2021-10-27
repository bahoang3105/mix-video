import { useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai'

const StartLiveButton = (props) => {
  const [visiting, setVisiting] = useState(false);
  return (
    <button
      className={props.className} 
      onMouseOver={() => setVisiting(!visiting)}
      onMouseOut={() => setVisiting(!visiting)}
      style={{ background: visiting ? 'linear-gradient(119.16deg, rgb(255, 143, 169) 8.6%, rgb(255, 110, 93) 60.32%)' : 'linear-gradient(119.16deg, rgb(255, 110, 93) -7.32%, rgb(255, 60, 106) 106.6%)' }}
      onClick={() => props.setPublish(true)}
    >
      <AiFillPlayCircle />
      <span className='space'/>
      Start live
    </button>
  );
}

export default StartLiveButton;
