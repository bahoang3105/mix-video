import Video from './Video';
import Camera from './Camera';
import Invite from './Invite';
import Library from './Library';
import Screen from './Screen';
import Website from './Website';
import Youtube from './Youtube';
import { useState } from 'react';
import getDisplayMedia from '../../../../../bottomSidebar/videos/getDisplayMedia';
import { connect } from 'react-redux';
import { addLayer, addVideo } from '../../../../../../redux/actions';

const VideoButton = (props) => {
  const [displayVideo, setDisplayVideo] = useState(' none');

  const addScreen = async () => {
    const stream = await getDisplayMedia();
    props.addVideo('screen', 'Screen sharing', stream);
    props.addLayer('screen', props.curScene, {name: 'Screen sharing', src: stream});
  }

  return (
    <div
      onMouseOver={() => setDisplayVideo('')}
      onMouseOut={() => setDisplayVideo(' none')}
    >
      <Video name='Video' />
      <span className='space-1 absolute' />
      <div className={`show-button-1${displayVideo}`}>
        <div onClick={() => props.setShowCamera(true)} style={{ cursor: 'pointer' }}>
          <Camera name='Camera' />
        </div>
        <div className='not-allowed'>
          <Library name='Library of video' />
        </div>
        <div onClick={() => props.setShowYoutube(true)} style={{ cursor: 'pointer' }}>
          <Youtube name='Video from YouTube' />
        </div>
        <div onClick={addScreen} style={{ cursor: 'pointer' }}>
          <Screen name='Screen Sharing' />
        </div>
        <div className='not-allowed'>
          <Website name='Website' />
        </div>
        <div className='not-allowed'>
          <Invite name='Invite guests to join' />
        </div> 
      </div>
    </div>
  );
}

export default connect(
  null,
  { addLayer, addVideo }
)(VideoButton);