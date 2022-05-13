import Upload from './Upload';
import { deleteFileAction, renameFileAction } from './Action';

const UploadAudio = ({ data, setData, ...props }) => {
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