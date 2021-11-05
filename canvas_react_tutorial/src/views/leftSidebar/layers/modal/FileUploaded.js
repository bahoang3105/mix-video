import {  useRef, useState } from "react";
import { addLayer } from '../../../../redux/actions';
import { connect } from 'react-redux';
import { AiOutlineMore } from 'react-icons/ai';
import MoreAction from "./MoreAction";

const FileUploaded = (props) => {
  const videoRef = useRef(null);
  const name = props.name.length >= 16 ? props.name.substring(0, 16) + '...' : props.name;
  const [displatMoreAction, setDisplayMoreAction] = useState(false);

  const thumbnailAudio = 'https://media.wired.com/photos/5f9ca518227dbb78ec30dacf/master/w_2560%2Cc_limit/Gear-RIP-Google-Music-1194411695.jpg'
  const thumbnail = (props.type === 'audio') ? thumbnailAudio : props.url;

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
            props.addLayer('imageUpload', props.curScene, {name: props.name, link: props.url, width: width/2, height: height/2, fileKey: props.fileKey, date: props.date}); 
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
      <div className='file-uploaded'>
        <div
          className='thumbnail'
          onClick={addToScene}
        >
          <video src={props.url} className='video-uploaded' controls={false} ref={videoRef} />
        </div>
        <span className='name-file-upload' id='video-name-uploaded'>
          {name}
        <span
          onClick={() => setDisplayMoreAction(true)}
          onMouseLeave={() => setDisplayMoreAction(false)}
        >
          <MoreAction 
            display={displatMoreAction} 
            setDisplay={setDisplayMoreAction}
            deleteFile={props.deleteFile}
            renameFile={props.renameFile}
            fileKey={props.fileKey}
            fileName={props.fileName}
          />
          <span className='more-action'>
            <AiOutlineMore />
          </span>
        </span>
      </span>
      </div>
    );
  }
  return (
    <div className='file-uploaded'>
      <div 
        className='thumbnail' 
        style={{ backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', cursor: 'pointer' }}
        onClick={addToScene}
      />
      <span className='name-file-upload'>
        {name}
        <span
          onClick={() => setDisplayMoreAction(true)}
          onMouseLeave={() => setDisplayMoreAction(false)}
        >
          <MoreAction 
            display={displatMoreAction} 
            setDisplay={setDisplayMoreAction}
            deleteFile={props.deleteFile}
            renameFile={props.renameFile}
            fileKey={props.fileKey}
            fileName={props.fileName}
          />
          <span className='more-action'>
            <AiOutlineMore />
          </span>
        </span>
      </span>
    </div>
  );
}

export default connect(
  null,
  { addLayer }
)(FileUploaded);