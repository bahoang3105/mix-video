import { Fragment, useEffect, useRef } from "react";
import { Ellipse, Transformer } from 'react-konva';

const CircleCanvas = (props) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (props.isSelected && !props.shapeProps.lock) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [props.isSelected, props.shapeProps.lock]);

  const onMove = (x, y) => {
    props.changeLayer('X', x);
    props.changeLayer('Y', y);
  }

  const onChange = (x, y, w, h, g) => {
    props.changeLayer('X', x);
    props.changeLayer('Y', y);
    if(g === props.shapeProps.g) {
      props.changeLayer('W', w);
      props.changeLayer('H', h);
    } else {
      props.changeLayer('G', g);
      props.changeLayer('W', w);
      props.changeLayer('H', h);
    }
  }


  return (
    <Fragment>
      <Ellipse
        onClick={props.onSelect}
        ref={shapeRef}
        fill={props.shapeProps.background}
        rotation={props.shapeProps.g}
        radiusX={props.shapeProps.width}
        radiusY={props.shapeProps.height}
        visible={!props.shapeProps.hidden}
        {...props.shapeProps}
        draggable={props.isSelected  && !props.shapeProps.lock}
        onDragEnd={(e) => onMove(e.target.x(), e.target.y())}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange(node.x(), node.y(), node.width() * scaleX, node.height() * scaleY, node.rotation());
        }}
      />
      {props.isSelected  && !props.shapeProps.lock && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
};

export default CircleCanvas;