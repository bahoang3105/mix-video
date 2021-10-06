import { AiOutlineUserAdd } from 'react-icons/ai';

const Invite = (props) => {
  return (
    <div className='add-video-buttons' onClick={() => props.setShow(false)}>
      <AiOutlineUserAdd />
      <div className='name-button-add-video'>Invite guests to join</div>
    </div>
  );
}

export default Invite;