import { AiFillCamera } from 'react-icons/ai';

const Camera = (props) => {
  return (
    <div className='add-video-buttons' onClick={() => props.setShow(false)}>
      <AiFillCamera />
      <div className='name-button-add-video'>Add from Camera</div>
    </div>
  );
}

export default Camera;