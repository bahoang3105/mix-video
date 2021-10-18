import { useEffect, useState } from 'react';
import Upload from './Upload';

const UploadAudio = (props) => {
  const dataFromStorage = localStorage.getItem('audio');
  const [data, setData] = useState(dataFromStorage ? JSON.parse(dataFromStorage) : []);
  useEffect(() => {
    localStorage.setItem('audio', JSON.stringify(data));
  }, [data]);

  return (
    <Upload 
      setShow={props.setShow} 
      show={props.show} 
      type='audio'
      choose='an audio'
      typeNotice='mp3, wav'
      data={data}
      setData={setData}  
    />
  );
}

export default UploadAudio;