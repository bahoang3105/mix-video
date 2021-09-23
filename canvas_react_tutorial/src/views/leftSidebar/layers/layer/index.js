import { useState } from "react";
import Buttons from "./Buttons";
import Icon from "./Icon";

const Layer = (props) => {
  const name = (props.nameLayer.length < 33) ? props.nameLayer : props.nameLayer.slice(0, 33) + '...';
  const [onSelect, setOnSelect] = useState(false);
  const selectLayer = onSelect ? ' select-layer' : '';
  return(
    <div
      className={`layer${selectLayer}`}
      onMouseOver={() => setOnSelect(!onSelect)}
      onMouseOut={() => setOnSelect(!onSelect)}
    >
      <Icon type='video'/>
      <span className='name-layer'>
        {name}
      </span>
      <Buttons display={selectLayer} />
    </div>
  );
};

export default Layer;