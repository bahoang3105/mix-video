import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { addScene, addVideo } from '../../../redux/actions';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

const ButtonAdd = (props) => {
  const [color, setColor] = useState('bottom-inactive');
  const addEvent = () => {
    if(props.name === 'scene') {
      props.addScene();
    } else {
      
      props.addVideo('hiih');
    }
  }
  if(props.name === 'scene') {
    return(
      <div
        className={`${props.className} ${color}`}
        onMouseOver={() => setColor('bottom-active')}
        onMouseOut={() => setColor('bottom-inactive')}
        onClick={addEvent}
      >
        <AiOutlinePlusCircle />
          <label className='bottom-bar-label'>
            Add {props.name}
          </label>
      </div>
    );
  }
  return(
    <div
      className={`${props.className} ${color}`}
      onMouseOver={() => setColor('bottom-active')}
      onMouseOut={() => setColor('bottom-inactive')}
      onClick={addEvent}
    >
      <AiOutlinePlusCircle />
      <Popup
        modal
        trigger={
          <label className='bottom-bar-label'>
            Add {props.name}
          </label>
        }
      >
        Modal Content
      </Popup>
    </div>
  );
};

export default connect(
  null,
  { addVideo, addScene }
)(ButtonAdd);
