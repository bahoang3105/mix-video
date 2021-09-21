import { AiFillPlayCircle } from 'react-icons/ai'

const StartLiveButton = (props) => {
  return (
    <button className={props.className}>
      <AiFillPlayCircle />
      <span className='space'/>
      Start live
    </button>
  );
}

export default StartLiveButton;
