import { Fragment, useEffect, useRef } from "react";
import { Transformer } from "react-konva";
import { Html } from 'react-konva-utils';

const Youtube = (props) => {
  const shapeRef = useRef();

  const onMove = (x, y) => {
    props.changeLayer('X', x);
    props.changeLayer('Y', y);
  }

  return (
    <Fragment>
      <Html
        onClick={props.onSelect}
        ref={shapeRef}
        {...props.shapeProps}
        draggable={props.isSelected}
        onDragEnd={(e) => onMove(e.target.x(), e.target.y())}
      >
        <iframe width="560" height="315" src="https://www.youtube.com/embed/0HXvxj7_F2Y?controls=0" title="YouTube video player" frameborder="0"></iframe>
      </Html>
    </Fragment>
  );
};

export default Youtube;