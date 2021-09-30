import { Fragment, useEffect, useRef } from "react";
import { Ellipse, Transformer } from 'react-konva';

const CircleCanvas = (props) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (props.isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [props.isSelected]);

  const onMove = (x, y) => {
    props.changeLayer('X', x);
    props.changeLayer('Y', y);
  }

  const onChange = (w, h, g) => {
    props.changeLayer('W', w);
    props.changeLayer('H', h);
    props.changeLayer('G', g);
  }

  return (
    <Fragment>
      <Ellipse
        onClick={props.onSelect}
        ref={shapeRef}
        rotation={props.shapeProps.g}
        radiusX={props.shapeProps.width}
        radiusY={props.shapeProps.height}
        {...props.shapeProps}
        draggable
        onDragEnd={(e) => onMove(e.target.x(), e.target.y())}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange(node.width() * scaleX, node.height() * scaleY, node.rotation());
        }}
      />
      {props.isSelected && (
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