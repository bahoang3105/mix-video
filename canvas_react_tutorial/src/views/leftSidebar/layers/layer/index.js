import { useState } from "react";
import Buttons from "./Buttons";
import Icon from "./Icon";

const Layer = (props) => {
  const name = (props.nameLayer.length < 29) ? props.nameLayer : props.nameLayer.slice(0, 29) + '...';
  const [onSelect, setOnSelect] = useState(false);
  const selectLayer = onSelect ? ' select-layer' : '';
  return(
    <div
      className={`layer${selectLayer}`}
      onMouseOver={() => setOnSelect(!onSelect)}
      onMouseOut={() => setOnSelect(!onSelect)}
    >
      <Icon type={props.type}/>
      <span className='name-layer'>
        {name}
      </span>
      <Buttons display={selectLayer} />
    </div>
  );
};

export default Layer;