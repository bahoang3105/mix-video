import { useEffect, useRef } from "react";
import { addLayer } from '../../../../redux/actions';
import { connect } from 'react-redux';

const FileUploaded = (props) => {
  const videoRef = useRef(null);
  const name = props.name.length >= 16 ? props.name.substring(0, 16) + '...' : props.name;
  const curDate = new Date();
  const fileDate = new Date(props.date);

  const thumbnailAudio = 'https://media.wired.com/photos/5f9ca518227dbb78ec30dacf/master/w_2560%2Cc_limit/Gear-RIP-Google-Music-1194411695.jpg'
  const thumbnail = (props.type === 'audio') ? thumbnailAudio : props.url;

  // an url has an expiry date of 1 day, so it needs to be renewed when it expires
  useEffect(() => {
    if(curDate.getTime() - fileDate.getTime() > 86000000) {
      props.renew(props.place);
    }
  });

  const getDetail = (url, callback) => {
    const img = new Image();
    img.src = url;
    img.onload = () => { callback(img.width, img.height); }
  }

  const addToScene = () => {
    props.closeModal();
    switch (props.type) {
      case 'image': {        
        getDetail(
          props.url,
          (width, height) => {
            props.addLayer('imageUpload', props.curScene, {name: props.name, link: props.url, width: width/2, height: height/2}); 
          }
        );
        break;
      } 
      case 'video': {
        props.addLayer('video', props.curScene, {
          name: props.name, 
          link: props.url, 
          width: videoRef.current.videoWidth / 2, 
          height: videoRef.current.videoHeight / 2,
        });
        break;
      }
      case 'audio': {
        props.addLayer('audio', props.curScene, {
          name: props.name,
          link: props.url,
        });
        break;
      }
      default:
        break;
    }
  }

  if(props.type === 'video') {
    return (
      <div className='file-uploaded' onClick={addToScene}>
        <span className='name-file-upload' id='video-name-uploaded'>
          {name}
        </span>
        <video src={props.url} className='video-uploaded' controls={false} ref={videoRef} />
      </div>
    );
  }
  return (
    <div 
      className='file-uploaded' 
      style={{ backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', cursor: 'pointer' }}
      onClick={addToScene}
    >
      <span className='name-file-upload'>
        {name}
      </span>
    </div>
  );
}

export default connect(
  null,
  { addLayer }
)(FileUploaded);