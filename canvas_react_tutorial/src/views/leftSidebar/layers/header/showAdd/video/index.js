import Video from './Video';
import Camera from './Camera';
import Invite from './Invite';
import Library from './Library';
import Screen from './Screen';
import Website from './Website';
import Youtube from './Youtube';
import { useState } from 'react';

const VideoButton = (props) => {
  const [displayVideo, setDisplayVideo] = useState(' none');
  return (
    <div
      onMouseOver={() => setDisplayVideo('')}
      onMouseOut={() => setDisplayVideo(' none')}
    >
      <Video name='Video' />
      <span className='space-1 absolute' />
      <div className={`show-button-1${displayVideo}`}>
        <div onClick={() => props.setShowCamera(true)}>
          <Camera name='Camera' />
        </div>
        <div onClick={() => props.addLayer('libraryVideo')}>
          <Library name='Library of video' />
        </div>
        <div onClick={() => props.addLayer('youtube')}>
          <Youtube name='Video from YouTube' />
        </div>
        <div onClick={() => props.addLayer('screen')}>
          <Screen name='Screen Sharing' />
        </div>
        <div onClick={() => props.addLayer('website')}>
          <Website name='Website' />
        </div>
        <div>
          <Invite name='Invite guests to join' />
        </div> 
      </div>
    </div>
  );
}

export default VideoButton;