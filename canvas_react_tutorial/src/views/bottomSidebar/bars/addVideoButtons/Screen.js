import { CgScreen } from 'react-icons/cg';
import { connect } from 'react-redux';
import getDisplayMedia from '../../videos/getDisplayMedia';
import { addVideo } from '../../../../redux/actions';

const Screen = (props) => {
  const changeModal = async () => {
    props.setShow(false);
    const stream = await getDisplayMedia();
    props.addVideo('screen', 'Screen sharing ', stream);
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