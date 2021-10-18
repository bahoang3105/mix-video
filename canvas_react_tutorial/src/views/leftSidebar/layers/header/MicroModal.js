import { useEffect, useRef, useState } from "react"
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import getUserMicro from '../../../bottomSidebar/videos/getUserMicro';
import stopStream from "../../../bottomSidebar/videos/stopStream";
import { addLayer } from "../../../../redux/actions";

const MicroModal = ({ show, setShow, microDevices, addLayer, ...props }) => {
  const audioRef = useRef(null);

  const [micro, setMicro] = useState(null);
  
  useEffect(() => {
    if(microDevices.length > 0) {
      setMicro(microDevices[0].deviceId);
      getAudio(micro);
    } else {
      alert('We need your permission to use the microphone!');
      setShow(false)
    }
  }, [microDevices, micro, setShow]);

  const renderListAudio = () => {
    const list = [];
    for(let i = 0; i < microDevices.length; i++) {
      list.push(<option value={microDevices[i].label ? microDevices[i].label : 'Default'} key={microDevices[i].deviceId}>{microDevices[i].label ? microDevices[i].label : 'Default'}</option>);
    }
    return list;
  }

  const getAudio = async (microphone) => {
    const stream = await getUserMicro(microphone);
    audioRef.current.srcObject = stream;
  }

  const closeStream = () => {
    setShow(false);
    if(audioRef.current) {
      stopStream(audioRef.current.srcObject);
    }
  }

  const addMicro = () => {
    addLayer('micro', props.curScene, {
      name: 'Micro ',
      type: 'micro',
      src: audioRef.current.srcObject,
    });
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
          <span className='x-close close-micro' onClick={closeStream}>x</span>
          <Modal.Title>
            Microphone
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <div className='apply-audio'  onClick={addMicro}>
            Apply for this scene
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default connect(
  null,
  { addLayer }
)(MicroModal);