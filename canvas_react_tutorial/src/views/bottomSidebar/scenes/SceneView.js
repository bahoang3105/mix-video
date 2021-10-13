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
import { getNumScene } from "../../../redux/selectors";
import DeleteModal from "../../DeleteModal";
import RenameModal from "../../RenameModal";
import ImageModal from "./ImageModal";

const SceneView = (props) => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const onClickDeleteOK = () => {
    props.delScene(props.id);
  };

  const checkShow = () => {
    if(!props.inactiveDelete) {
      setShowDelete(true);
    }
  }

  const changeScene = () => {
    props.changeCurScene(props.id, props.nameScene);
    props.changeCurLayer(null);
  }

  const createThumbnail = url => {
    props.createThumbnail(url, props.id);
  }

  const rename = newName => {
    props.changeNameScene(newName, props.id);
  }

  const color = (props.id === props.onSelect) ? ' bottom-active' : '';

  return(
    <div
      className={`scene-view${color}`}
      style={{ backgroundImage: `url(${props.img})`, backgroundSize: 'contain' }}
    >
      <div className='click-scene-1' onClick={changeScene}/>
      <div className='buttons-scene-view'>
        <div className='button-scene-view hover' onClick={() => setShowImage(true)}>
          <AiOutlineCamera />
        </div>
        <ImageModal setShowImage={setShowImage} showImage={showImage} updateImage={createThumbnail} />
        <div className='button-scene-view hover' onClick={() => props.duplicateScene(props.id, props.numScene)}>
          <BiCopy />
        </div>
        <div className={`button-scene-view hover${props.inactiveDelete ? ' inactive-true' : ''}`} onClick={checkShow}>
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

const mapStateToProps = state => ({
  numScene: getNumScene(state),
});

export default connect(
  mapStateToProps,
  { delScene, createThumbnail, duplicateScene, changeNameScene, changeCurScene, changeCurLayer }
)(SceneView);