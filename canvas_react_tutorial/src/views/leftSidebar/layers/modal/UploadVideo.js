import { useEffect, useState } from 'react';
import Upload from './Upload';

const UploadVideo = (props) => {
  const dataFromStorage = localStorage.getItem('video');
  const [data, setData] = useState(dataFromStorage ? JSON.parse(dataFromStorage) : []);
  useEffect(() => {
    localStorage.setItem('video', JSON.stringify(data));
  }, [data]);

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