import { useState } from 'react';
import { BsUpload } from 'react-icons/bs';

const UploadImage = (props) => {
  const [isSelect, setIsSelect] = useState('');
  return (
    <div
      className={`button-layer left-add-buttons${isSelect}`}
      onMouseOver={() => setIsSelect(' on-select-duplicate')}
      onMouseOut={() => setIsSelect('')}
      onClick={() => props.setShow(true)}
    >
      <BsUpload />
      <span className='space' />
      {props.name}
    </div>
  );
}

export default UploadImage;