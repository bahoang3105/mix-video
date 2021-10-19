import { useState } from 'react';
import Upload from './Upload';

const UploadAudio = (props) => {
  const [data, setData] = useState([]);

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