import { AiFillCamera } from 'react-icons/ai';

const Camera = (props) => {
  const changeModal = () => {
    props.setShow(false);
    props.setShowCamera(true);
  }
  return (
    <div className='add-video-buttons' onClick={changeModal}>
      <AiFillCamera />
      <div className='name-button-add-video'>Add from Camera</div>
    </div>
  );
}

export default Camera;