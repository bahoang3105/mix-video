import { useEffect, useState } from 'react';
import Upload from './Upload';
import getFile from './getFile';
import { deleteFileAction, renameFileAction } from './Action';

const UploadAudio = (props) => {
  const [data, setData] = useState(null);

  const listAudioType = ['mp3', 'wav'];
  
  const deleteFile = async (fileKey) => {
    const newData = await deleteFileAction(fileKey, data);
    setData(newData);
  }

  const renameFile = async (fileKey, fileName) => {
    const newData = await renameFileAction(fileKey, fileName, data);
    setData(newData);
  }

  const getAudioFile = async () => {
    if(data === null) {
      const listFile = await getFile();
      const listAudioFile = listFile.data.files.filter(file => listAudioType.includes(file.fileType));
      setData(listAudioFile);
    }
  }

  useEffect(() => {
    getAudioFile();
  });

  return (
    <Upload 
      setShow={props.setShow} 
      show={props.show} 
      type='audio'
      choose='an audio'
      typeNotice='mp3, wav'
      data={data === null ? [] : data}
      setData={setData}  
      deleteFile={deleteFile}
      renameFile={renameFile}
    />
  );
}

export default UploadAudio;