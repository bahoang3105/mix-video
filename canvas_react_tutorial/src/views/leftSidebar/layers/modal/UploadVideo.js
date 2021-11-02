import { useEffect, useState } from 'react';
import GetFile from './getFile';
import Upload from './Upload';

const UploadVideo = (props) => {
  const [data, setData] = useState(null);

  const listVideoType = ['mp4', 'mov', 'webm'];
  
  const getVideoFile = async () => {
    if(data === null) {
      const listFile = await GetFile();
      const listVideoFile = listFile.data.files.filter(file => listVideoType.includes(file.fileType));
      setData(listVideoFile);
    }
  }

  useEffect(() => {
    getVideoFile();
  });

  return (
    <Upload 
      setShow={props.setShow} 
      show={props.show} 
      type='video'
      choose='a video'
      typeNotice='mp4, mov or webm'
      data={data === null ? [] : data}
      setData={setData}  
    />
  );
}

export default UploadVideo;