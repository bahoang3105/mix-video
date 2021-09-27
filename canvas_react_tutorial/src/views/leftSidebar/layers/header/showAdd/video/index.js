import Video from './Video';
import Camera from './Camera';
import Invite from './Invite';
import Library from './Library';
import Screen from './Screen';
import Website from './Website';
import Youtube from './Youtube';
import { useState } from 'react';

const VideoButton = () => {
  const [displayVideo, setDisplayVideo] = useState(' none');
  return (
    <div
      onMouseOver={() => setDisplayVideo('')}
      onMouseOut={() => setDisplayVideo(' none')}
    >
      <Video name='Video' />
      <span className='space-1 absolute' />
      <div className={`show-button-1${displayVideo}`}>
        <Camera name='Camera' />
        <Library name='Library of video' />
        <Youtube name='Video from YouTube' />
        <Screen name='Screen Sharing' />
        <Website name='Website' />
        <Invite name='Invite guests to join' />
      </div>
    </div>
  );
}

export default VideoButton;