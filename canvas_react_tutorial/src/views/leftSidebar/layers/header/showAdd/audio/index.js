import { useState } from 'react';
import Audio from './Audio';
import Library from './Library';
import Micro from './Micro';

const AudioButtons = () => {
  const [displayAudio, setDisplayAudio] = useState(' none');
  return (
    <div
      onMouseOver={() => setDisplayAudio('')}
      onMouseOut={() => setDisplayAudio(' none')}
    >
      <Audio name='Audio' />
      <span className='space-1 absolute' />
      <div className={`show-button-1${displayAudio}`}>
        <Library name='Audio Library' />
        <Micro name='Microphone' />
      </div>
    </div>
  );
}

export default AudioButtons;