import { deleteFileAction, renameFileAction } from './Action';
import Upload from './Upload';

const UploadImage = ({ data, setData, ...props }) => {
  const deleteFile = async (fileKey) => {
    const newData = await deleteFileAction(fileKey, data);
    setData(newData);
  }

  const renameFile = async (fileKey, fileName) => {
    const newData = await renameFileAction(fileKey, fileName, data);
    setData(newData);
  }

  return (
    <Upload 
      setShow={props.setShow} 
      show={props.show} 
      type='image'
      choose='an image'
      typeNotice='jpg, png or gif'
      data={data === null ? [] : data}
      setData={setData}
      deleteFile={deleteFile}
      renameFile={renameFile}
    />
  );
}

export default UploadImage;