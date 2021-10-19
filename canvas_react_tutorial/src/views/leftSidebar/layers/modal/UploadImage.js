import { useState } from 'react';
import Upload from './Upload';

const UploadImage = (props) => {
  const [data, setData] = useState([]);

  return (
    <Upload 
      setShow={props.setShow} 
      show={props.show} 
      type='image'
      choose='an image'
      typeNotice='jpg, png or gif'
      data={data}
      setData={setData}  
    />
  );
}

export default UploadImage;