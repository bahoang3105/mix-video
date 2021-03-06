import { useState } from "react";
import Buttons from "./Buttons";
import Icon from "./Icon";
import {
  delLayer,
  changeCurLayer,
  duplicateLayer,
  changeNameLayer,
  changeLayer,
} from "../../../../redux/actions";
import { connect } from "react-redux";
import RenameModal from "../../../RenameModal";
import { setValue } from "../../../rightSidebar/settings";

const Layer = (props) => {
  const name = (props.nameLayer.length < 29) ? props.nameLayer : props.nameLayer.slice(0, 29) + '...';
  const [onActive, setOnActive] = useState(false);
  const hoverLayer = onActive ? ' hover-layer' : '';
  const [showDelete, setShowDelete] = useState(false);
  const selectedLayer = (props.selectedLayer === props.id) ? ' selected-layer' : '';
  const [show, setShow] = useState(false);

  const onClickDelete = state => {
    setShowDelete(state);
    setOnActive(false);
  }

  const onClickDeleteOK = () => {
    props.delLayer(props.id);
    setShowDelete(false);
  }

  const rename = newName => {
    props.changeNameLayer(newName, props.id);
  }

  const setValueLayer = type => {
    setValue(type, null, props.changeLayer, props.data)
  }

  return(
    <div
      className={`layer${hoverLayer}${selectedLayer}`}
      onMouseOver={() => setOnActive(true)}
      onMouseOut={() => setOnActive(false)}
    >
      <div className='click-layer'
        onClick={() => props.changeCurLayer(props.id)}
        onDoubleClick={() => setShow(true)}
      />
      <Icon type={props.type}/>
      <span className='name-layer'>
        {name}
      </span>
      <Buttons 
        display={hoverLayer} 
        setShowDelete={onClickDelete}
        showDelete={showDelete}
        onClickDeleteOK={onClickDeleteOK}
        duplicate={() => props.duplicateLayer(props.id)}
        setValue={setValueLayer}
        hidden={props.hidden}
        lock={props.lock}
      />
      <RenameModal show={show} setShow={setShow} name={props.nameLayer} rename={rename} />
    </div>
  );
};

export default connect(
  null,
  { delLayer, changeCurLayer, duplicateLayer, changeNameLayer, changeLayer }
)(Layer);