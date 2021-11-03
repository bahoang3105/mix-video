import { useEffect, useState } from 'react';
import { deleteFileAction, renameFileAction } from './Action';
import GetFile from './getFile';
import Upload from './Upload';

const UploadVideo = (props) => {
  const [data, setData] = useState(null);

  const listVideoType = ['mp4', 'mov', 'webm'];
  
  const deleteFile = async (fileKey) => {
    const newData = await deleteFileAction(fileKey, data);
    setData(newData);
  }

  const renameFile = async (fileKey, fileName) => {
    const newData = await renameFileAction(fileKey, fileName, data);
    setData(newData);
  }

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
      deleteFile={deleteFile}
      renameFile={renameFile}
    />
  );
}

export default UploadVideo;