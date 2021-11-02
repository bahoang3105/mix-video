import { useEffect, useState } from 'react';
import GetFile from './getFile';
import Upload from './Upload';

const UploadImage = (props) => {
  const [data, setData] = useState(null);

  const listAudioType = ['jpg', 'png', 'gif'];
  
  const getImageFile = async () => {
    if(data === null) {
      const listFile = await GetFile();
      const listImageFile = listFile.data.files.filter(file => listAudioType.includes(file.fileType));
      setData(listImageFile);
    }
  }

  useEffect(() => {
    getImageFile();
  });

  return (
    <Upload 
      setShow={props.setShow} 
      show={props.show} 
      type='image'
      choose='an image'
      typeNotice='jpg, png or gif'
      data={data === null ? [] : data}
      setData={setData}  
    />
  );
}

export default UploadImage;