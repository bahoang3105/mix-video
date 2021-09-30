import { useState } from "react";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { BiCopy } from 'react-icons/bi';
import { connect } from 'react-redux';
import {
  delScene,
  changeNameScene,
  duplicateScene,
  createThumbnail,
  changeCurScene,
  changeCurLayer,
} from '../../../redux/actions';

const SceneView = (props) => {
  const [camera, setCamera] = useState('');
  const [copy, setCopy] = useState('');
  const [del, setDel] = useState('');

  const delScene = () => {
    if(!props.inactiveDelete) {
      props.delScene(props.nameScene);
    }
  };

  const changeScene = () => {
    props.changeCurScene(props.id, props.nameScene);
    props.changeCurLayer(null);
  }

  const color = (props.id === props.onSelect) ? ' bottom-active' : '';

  return(
    <div
      className={`scene-view${color}`}
      style={{ backgroundImage: `url(${props.img})` }}
    >
      <div className='click-scene-1' onClick={changeScene}/>
      <div className='buttons-scene-view'>
        <div
          className={`button-scene-view${camera}`}
          onMouseOver={() => setCamera(' over-mouse')}
          onMouseOut={() => setCamera('')}
          // onClick
        >
          <AiOutlineCamera />
        </div>
        <div
          className={`button-scene-view${copy}`}
          onMouseOver={() => setCopy(' over-mouse')}
          onMouseOut={() => setCopy('')}
        >
          <BiCopy />
        </div>
        <div
          className={`button-scene-view${del}${props.inactiveDelete ? ' inactive-true' : ''}`}
          onMouseOver={() => setDel(' over-mouse')}
          onMouseOut={() => setDel('')}
          onClick={delScene}
        >
          <AiOutlineDelete />
        </div>
      </div>
      <div className='click-scene-2' onClick={changeScene}/>
      <span className='name-scene-view' onDoubleClick={() => console.log('hahah')}>
        {props.nameScene}
      </span>
    </div>
  );
};

export default connect(
  null,
  { delScene, createThumbnail, duplicateScene, changeNameScene, changeCurScene, changeCurLayer }
)(SceneView);