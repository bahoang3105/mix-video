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
import DeleteModal from "../../DeleteModal";
import RenameModal from "../../RenameModal";

const SceneView = (props) => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const onClickDeleteOK = () => {
    if(!props.inactiveDelete) {
      props.delScene(props.id);
    }
  };

  const changeScene = () => {
    props.changeCurScene(props.id, props.nameScene);
    props.changeCurLayer(null);
  }

  const rename = newName => {
    props.changeNameScene(newName, props.id);
  }

  const color = (props.id === props.onSelect) ? ' bottom-active' : '';

  return(
    <div
      className={`scene-view${color}`}
      style={{ backgroundImage: `url(${props.img})` }}
    >
      <div className='click-scene-1' onClick={changeScene}/>
      <div className='buttons-scene-view'>
        <div className='button-scene-view hover'>
          <AiOutlineCamera />
        </div>
        <div className='button-scene-view hover'>
          <BiCopy />
        </div>
        <div className={`button-scene-view hover${props.inactiveDelete ? ' inactive-true' : ''}`} onClick={() => setShowDelete(true)}>
          <AiOutlineDelete />
        </div>
        <DeleteModal setShowDelete={setShowDelete} showDelete={showDelete} onClickDeleteOK={onClickDeleteOK} />
      </div>
      <div className='click-scene-2' onClick={changeScene}/>
      <span className='name-scene-view' onDoubleClick={() => setShow(true)}>
        {props.nameScene}
      </span>
      <RenameModal show={show} setShow={setShow} name={props.nameScene} rename={rename} />
    </div>
  );
};

export default connect(
  null,
  { delScene, createThumbnail, duplicateScene, changeNameScene, changeCurScene, changeCurLayer }
)(SceneView);