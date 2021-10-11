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
        <div onClick={() => props.addLayer('libraryAudio')} style={{ cursor: 'pointer' }}>
          <Library name='Audio Library' />
        </div>
        <div onClick={() => props.addLayer('micro')} style={{ cursor: 'pointer' }}>
          <Micro name='Microphone' />
        </div>
      </div>
    </div>
  );
}

export default AudioButtons;