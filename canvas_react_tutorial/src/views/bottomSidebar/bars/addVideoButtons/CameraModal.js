import { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addLayer, addVideo } from '../../../../redux/actions';
import getUserMedia from '../../videos/getUserMedia';
import stopStream from '../../videos/stopStream';

const CameraModal = ({ setShow, show, cameraDevices, microDevices, addVideo, addLayer, ...props }) => {
  const videoRef = useRef(null);

  const [camera, setCamera] = useState(cameraDevices.length === 0 ? false : cameraDevices[0].deviceId);
  const [micro, setMicro] = useState(false);
  const [label, setLabel] = useState(cameraDevices.length === 0 ? null : cameraDevices[0].deviceId);

  const renderListVideo = () => {
    if (!cameraDevices) return;
    const list = [];
    for (let i = 0; i < cameraDevices.length; i++) {
      list.push(<option value={cameraDevices[i].deviceId} key={cameraDevices[i].deviceId}>{cameraDevices[i].label ? cameraDevices[i].label : 'Camera'}</option>);
    }
    return list;
  }

  const renderListAudio = () => {
    const list = [];
    if (!microDevices) {
      list.push(<option value={false} key='mute'>No microphone</option>);
      return list;
    };
    for (let i = 0; i < microDevices.length; i++) {
      list.push(<option value={microDevices[i].label ? microDevices[i].label : 'Default'} key={microDevices[i].deviceId}>{microDevices[i].label ? microDevices[i].label : 'Default'}</option>);
    }
    list.push(<option value={false} key='mute'>No microphone</option>);
    return list;
  }


  const getVideo = async (camera, microphone) => {
    try {
      const stream = await getUserMedia(camera, microphone);
      videoRef.current.srcObject = stream;
    } catch (e) {
      console.error(e);
    }
  }

  if (cameraDevices !== null && microDevices !== null) {
    getVideo(camera, micro);
  }

  const addCamera = () => {
    if (label === null) {
      alert('We need your permission to use the camera and microphone!');
      setShow(false);
      return;
    }
    addVideo('camera', label, {
      src: videoRef.current.srcObject,
      height: videoRef.current.srcObject.getVideoTracks()[0].getSettings().height / 2,
      width: videoRef.current.srcObject.getVideoTracks()[0].getSettings().width / 2,
    });
    setShow(false);
    if (props.curScene) {
      addLayer('camera', props.curScene, {
        name: label,
        type: 'camera',
        src: videoRef.current.srcObject,
        height: videoRef.current.srcObject.getVideoTracks()[0].getSettings().height / 2,
        width: videoRef.current.srcObject.getVideoTracks()[0].getSettings().width / 2,
      });
    }
  }

  const closeStream = () => {
    setShow(false);
    stopStream(videoRef.current.srcObject);
  }

  const changeCamera = e => {
    setCamera(e.target.key);
    setLabel(e.target.value);
  }

  return (
    <Modal
      show={show}
      onHide={closeStream}
      backdrop={true}
      className='modal'
    >
      <div className='border-modal'>
        <Modal.Header>
          <span className='x-close close-camera' onClick={closeStream}>x</span>
          <Modal.Title>
            Webcam
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='info-add-image'>
            <video width={450} height={300} ref={videoRef} autoPlay></video>
          </div>
          <div className='select-devices'>
            Add Camera
          </div>
          <select
            className='select-video-audio'
            onChange={e => changeCamera(e)}
          >
            {renderListVideo()}
          </select>
          <div className='select-devices'>
            Microphone
          </div>
          <select
            className='select-video-audio'
            defaultValue={false}
            onChange={e => setMicro(e.target.key)}
          >
            {renderListAudio()}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <div className='apply-video' onClick={addCamera}>
            Apply for this scene
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default connect(
  null,
  { addVideo, addLayer }
)(CameraModal);