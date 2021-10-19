import { useState } from 'react';
import Upload from './Upload';

const UploadVideo = (props) => {
  const [data, setData] = useState([]);

  return (
    <Upload 
      setShow={props.setShow} 
      show={props.show} 
      type='video'
      choose='a video'
      typeNotice='mp4, mov or webm'
      data={data}
      setData={setData}  
    />
  );
}

export default UploadVideo;