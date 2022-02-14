import { AiOutlineFolderView } from 'react-icons/ai';
const Scene = (props) => {
  return(
    <div className={props.className} onClick={props.onClick}>
      <AiOutlineFolderView />
      <label className='bottom-bar-label'>
        Scene
      </label>
    </div>
  );
};

export default Scene;