import { CgScreen } from 'react-icons/cg';

const Screen = (props) => {
  return (
    <div className='add-video-buttons' onClick={() => props.setShow(false)}>
      <CgScreen />
      <div className='name-button-add-video'>Share Screen</div>
    </div>
  );
}

export default Screen;