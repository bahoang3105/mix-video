import { useEffect } from "react";
import { addLayer } from '../../../../redux/actions';
import { connect } from 'react-redux';

const FileUploaded = (props) => {
  const name = props.name.length >= 16 ? props.name.substring(0, 16) + '...' : props.name;
  const curDate = new Date();
  const fileDate = new Date(props.date);

  // an url has an expiry date of 1 day, so it needs to be renewed when it expires
  useEffect(() => {
    if(curDate.getTime() - fileDate.getTime() > 86000000) {
      props.renew(props.place);
    }
  })

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
            props.addLayer('image', props.curScene, {link: props.url, width: width, height: height}); 
          }
        );
        break;
      }
      default:
        break;
    }
  }

  return (
    <div 
      className='file-uploaded' 
      style={{ backgroundImage: `url(${props.img})`, backgroundSize: 'cover', cursor: 'pointer' }}
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