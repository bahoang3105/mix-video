import { AiOutlinePlusCircle } from "react-icons/ai";
import ShowAdd from './showAdd';
import { useEffect, useState } from 'react';
import ImageAdd from "../modal/ImageAdd";
import CameraModal from '../../../bottomSidebar/bars/addVideoButtons/CameraModal';
import YoutubeModal from "./YoutubeModal";
import UploadImage from "../modal/UploadImage";
import UploadVideo from "../modal/UploadVideo";
import UploadAudio from "../modal/UploadAudio";
import MicroModal from "./MicroModal";
import AddRTMP from "../modal/AddRTMP";
import axios from "axios";
import BaseUrl from "../../../../BaseUrl";
import { renewUrl } from "../../../../redux/actions";
import { connect } from "react-redux";

const ButtonAdd = (props) => {
  const [displayAdd, setDisplayAdd] = useState(' none');
  const [showImage, setShowImage] = useState(false);
  const [devices, setDevices] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showYoutube, setShowYoutube] = useState(false);
  const [showUploadImage, setShowUploadImage] = useState(false);
  const [showUploadVideo, setShowUploadVideo] = useState(false);
  const [showMicro, setShowMicro] = useState(false);
  const [showUploadAudio, setShowUploadAudio] = useState(false);
  const [showRTMP, setShowRTMP] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const [dataVideo, setDataVideo] = useState(null);
  const [dataAudio, setDataAudio] = useState(null);
  const curDate = new Date();

  useEffect(() => {
    if(!devices) {
      getDevices();
    }
  });

  const renew = async(fileKey) => {
    try {
      const { data } = await axios.get(BaseUrl + '/file/renewUrl', {
        headers: {
          'secret-key': localStorage.getItem('secretKey'),
        },
        params: {
          fileKey: fileKey,
        }
      });
      props.renewUrl(fileKey, data.url);
    }
    catch(err) {
      console.error(err);
    }
  }

  const listAudioType = ['mp3', 'wav'];
  const listVideoType = ['mp4', 'mov', 'webm'];
  const listImageType = ['jpg', 'png', 'gif'];

  const getFiles = async () => {
    try{
      if(dataImage === null && dataVideo === null && dataAudio === null) {
        const listFile = await axios.get(BaseUrl + '/file/getFiles', {
          headers: {
            'secret-key': localStorage.getItem('secretKey'),
          }
        });
        for(let i = 0; i < listFile.data.files.length; i++) {
          const fileDate = new Date(listFile.data.files[i].date);
          if(curDate.getTime() - fileDate.getTime() > 86000000) {
            await renew(listFile.data.files[i].fileKey);
          }
        }
        const listAudioFile = listFile.data.files.filter(file => listAudioType.includes(file.fileType));
        const listVideoFile = listFile.data.files.filter(file => listVideoType.includes(file.fileType));
        const listImageFile = listFile.data.files.filter(file => listImageType.includes(file.fileType));
        setDataAudio(listAudioFile);
        setDataImage(listImageFile);
        setDataVideo(listVideoFile);
      }
    } catch (err) {
      console.error(err.response.data.message);
    }
  }

  useEffect(() => {
    getFiles();
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

  const renderYoutube = () => {
    if(showYoutube) {
      return (
        <YoutubeModal
          show={showYoutube}
          setShow={setShowYoutube}
          curScene={props.curScene}
        />
      );
    }
  }

  const renderMicro = () => {
    if(showMicro && devices !== null) {
      return (
        <MicroModal
          show={showMicro}
          setShow={setShowMicro}
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
          setShowYoutube={setShowYoutube}
          setShowUploadImage={setShowUploadImage}
          setShowUploadVideo={setShowUploadVideo}
          setShowUploadAudio={setShowUploadAudio}
          setShowMicro={setShowMicro}
          setShowRTMP={setShowRTMP}
        />
      </div>
      <ImageAdd curScene={props.curScene} show={showImage} setShow={setShowImage} />
      <UploadImage curScene={props.curScene} show={showUploadImage} setShow={setShowUploadImage} data={dataImage} setData={setDataImage} />
      <UploadVideo curScene={props.curScene} show={showUploadVideo} setShow={setShowUploadVideo} data={dataVideo} setData={setDataVideo} />
      <UploadAudio curScene={props.curScene} show={showUploadAudio} setShow={setShowUploadAudio} data={dataAudio} setData={setDataAudio} />
      <AddRTMP curScene={props.curScene} show={showRTMP} setShow={setShowRTMP} />
      {renderCamera()}
      {renderYoutube()}
      {renderMicro()}
    </>
  );
};

export default connect(
  null,
  { renewUrl }
)(ButtonAdd);