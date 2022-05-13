import { useState } from 'react';
import { deleteFileAction, renameFileAction } from './Action';
import Upload from './Upload';

const UploadVideo = (props) => {
  const [data, setData] = useState([]);
  const deleteFile = async (fileKey) => {
    try {
      const newData = await deleteFileAction(fileKey, data);
      setData(newData);
    } catch (e) {
      console.error(e);
    }
  }

  const renameFile = async (fileKey, fileName) => {
    try {
      const newData = await renameFileAction(fileKey, fileName, data);
      setData(newData);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Upload 
      setShow={props.setShow} 
      show={props.show} 
      type='video'
      choose='a video'
      typeNotice='mp4, mov or webm'
      data={data === null ? [] : data}
      setData={setData}  
      deleteFile={deleteFile}
      renameFile={renameFile}
    />
  );
}

export default UploadVideo;