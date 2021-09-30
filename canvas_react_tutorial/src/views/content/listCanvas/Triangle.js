import { Fragment, useEffect, useRef } from "react";
import { Line, Transformer } from 'react-konva';

const Triangle = (props) => {
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
      <Line
        onClick={props.onSelect}
        ref={shapeRef}
        points={[props.shapeProps.width/2, 0, 0, props.shapeProps.height, props.shapeProps.width, props.shapeProps.height]}
        closed={true}
        rotation={props.shapeProps.g}
        {...props.shapeProps}
        draggable
        onDragEnd={(e) => onMove(e.target.x(), e.target.y())}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          console.log(node)
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

export default Triangle;