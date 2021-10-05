import { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { getMicroDevices, getCameraDevices } from '../../../../redux/actions';
import { getListCamera, getListMicro } from '../../../../redux/selectors';

const getUserMedia = async (cameraId, audioId) => {
  try {
    const constraints = (audioId !== 'false') ? {
      video: {
        deviceId: cameraId,
      },
      audio: {
        deviceId: audioId,
        echoCancellation: true,
      }
    } : {
      video: {
        deviceId: cameraId,
      },
      audio: false,
    };
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    console.log(err);
  }
};

const CameraModal = ({ setShow, show, cameraDevices, microDevices }) => {
  const videoRef = useRef(null);


  const [camera, setCamera] = useState(null);
  const [micro, setMicro] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if(!cameraDevices) {
      dispatch(getCameraDevices());
    }
    if(!microDevices) {
      dispatch(getMicroDevices());
    }
    if(cameraDevices && microDevices) {
      setCamera(cameraDevices[0].deviceId);
    }
  }, [cameraDevices, microDevices, dispatch]);

  const renderListVideo = () => {
    if(!cameraDevices) return;
    const list = [];
    for(let i = 0; i < cameraDevices.length; i++) {
      list.push(<option value={cameraDevices[i].deviceId} key={cameraDevices[i].deviceId}>{cameraDevices[i].label}</option>);
    }
    return list;
  }

  const renderListAudio = () => {
    const list = [];
    if(!microDevices) {
      list.push(<option value={false} key='mute'>No microphone</option>);
      return list;
    };
    for(let i = 0; i < microDevices.length; i++) {
      list.push(<option value={microDevices[i].deviceId} key={microDevices[i].deviceId}>{microDevices[i].label}</option>);
    }
    list.push(<option value={false} key='mute'>No microphone</option>);
    return list;
  }


  const getVideo = async (camera, microphone) => {
    const stream = await getUserMedia(camera, microphone);
    videoRef.current.srcObject = stream;
  }

  if(cameraDevices !== null && microDevices !== null) {
    getVideo(camera, micro);
  }

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop={true}
      className='modal'
    >
      <div className='border-modal'>
        <Modal.Header>
          <span className='x-close close-camera' onClick={() => setShow(false)}>x</span>
          <Modal.Title>
            Webcam
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='info-add-image'>
            <video width={450} height={300} ref={videoRef} autoPlay></video>
          </div>
          <div className='select-divices'>
            Add Camera
          </div>
          <select
            className='select-video-audio'
            defaultValue={false}
            onChange={e => setCamera(e.target.value)}
          >
            {renderListVideo()}
          </select>
          <div className='select-devices'>
            Microphone
          </div>
          <select 
            className='select-video-audio'  
            onChange={e => setMicro(e.target.value)}
          >
            {renderListAudio()}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <div className='apply-video'>
            Apply for this scene
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

const mapStateToProps = state => ({
  cameraDevices: getListCamera(state),
  microDevices: getListMicro(state),
});

export default connect(mapStateToProps)(CameraModal);