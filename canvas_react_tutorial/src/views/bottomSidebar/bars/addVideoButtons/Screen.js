import { CgScreen } from 'react-icons/cg';
import { connect } from 'react-redux';
import getDisplayMedia from '../../videos/getDisplayMedia';
import { addVideo } from '../../../../redux/actions';

const Screen = (props) => {
  const changeModal = async () => {
    props.setShow(false);
    const stream = await getDisplayMedia();
    if(stream) {
      props.addVideo('screen', 'Screen sharing ', { 
        src: stream, 
        height: stream.getVideoTracks()[0].getSettings().height/2, 
        width: stream.getVideoTracks()[0].getSettings().width/2, 
      });
    }
  }

  return (
    <div className='add-video-buttons' onClick={changeModal}>
      <CgScreen />
      <div className='name-button-add-video'>Share Screen</div>
    </div>
  );
}

export default connect(
  null,
  { addVideo }
)(Screen);