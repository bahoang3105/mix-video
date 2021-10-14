import { useEffect, useState } from 'react';
import Upload from './Upload';

const UploadImage = (props) => {
  const dataFromStorage = localStorage.getItem('image');
  const [data, setData] = useState(dataFromStorage ? JSON.parse(dataFromStorage) : []);
  useEffect(() => {
    localStorage.setItem('image', JSON.stringify(data));
  }, [data]);

  return (
    <Upload 
      setShow={props.setShow} 
      show={props.show} 
      type='Image'
      choose='an image'
      typeNotice='jpg, png or gif'
      data={data}
      setData={setData}  
    />
  );
}

export default UploadImage;