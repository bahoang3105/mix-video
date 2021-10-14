import Image from './Image';
import { useState } from 'react';
import FromURL from './FromURL';
import UploadImage from './UploadImage';

const ImageButton = (props) => {
  const [displayImage, setDisplayImage] = useState(' none');
  return (
    <div
      onMouseOver={() => setDisplayImage('')}
      onMouseOut={() => setDisplayImage(' none')}
    >
      <Image name='Image' />
      <span className='space-1 absolute' />
      <div className={`show-button-1${displayImage}`}>
        <div style={{ cursor: 'pointer' }}>
          <FromURL name='From URL' setShow={props.setShow}/>
        </div>
        <div style={{ cursor: 'pointer' }}>
          <UploadImage name='Upload Image' setShow={props.setShowUpload} />
        </div>
      </div>
    </div>
  );
}

export default ImageButton;