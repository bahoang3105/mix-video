import { useState } from 'react';
import Audio from './Audio';
import Library from './Library';
import Micro from './Micro';

const AudioButtons = (props) => {
  const [displayAudio, setDisplayAudio] = useState(' none');
  return (
    <div
      onMouseOver={() => setDisplayAudio('')}
      onMouseOut={() => setDisplayAudio(' none')}
    >
      <Audio name='Audio' />
      <span className='space-1 absolute' />
      <div className={`show-button-1${displayAudio}`}>
        <div style={{ cursor: 'pointer' }}>
          <Library name='Audio Library' setShow={props.setShowUploadAudio} />
        </div>
        <div style={{ cursor: 'pointer' }}>
          <Micro name='Microphone' setShow={props.setShowMicro} />
        </div>
      </div>
    </div>
  );
}

export default AudioButtons;