import { AiOutlinePlusCircle } from "react-icons/ai";
import ShowAdd from './showAdd';
import { useEffect, useState } from 'react';
import ImageAdd from "../modal/ImageAdd";
import CameraModal from '../../../bottomSidebar/bars/addVideoButtons/CameraModal';

const ButtonAdd = (props) => {
  const [displayAdd, setDisplayAdd] = useState(' none');
  const [showImage, setShowImage] = useState(false);
  const [devices, setDevices] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    if(!devices) {
      getDevices();
    }
  });

  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    setDevices(devices);
  }
  
  const renderCamera = () => {
    if(showCamera && devices !== null) {
      return (
        <CameraModal
          show={showCamera}
          setShow={setShowCamera}
          cameraDevices={devices.filter(device => device.kind === 'videoinput')}
          microDevices={devices.filter(device => device.kind === 'audioinput')}
          curScene={props.curScene}
          
        />
      );
    }
  }
  return(
    <>
      <div
        id='left-add'
        onMouseOver={() => setDisplayAdd('')}
        onMouseOut={() => setDisplayAdd(' none')}
        onClick={() => setDisplayAdd(' none')}
      >
        <AiOutlinePlusCircle />
        <span className='space' />
        <ShowAdd 
          display={displayAdd} 
          curScene={props.curScene} 
          setShowImage={setShowImage}
          setShowCamera={setShowCamera}
        />
      </div>
      <ImageAdd curScene={props.curScene} show={showImage} setShow={setShowImage} />
      {renderCamera()}
    </>
  );
};

export default ButtonAdd;