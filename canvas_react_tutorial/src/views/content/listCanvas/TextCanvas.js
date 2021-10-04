import { Fragment, useEffect, useRef } from "react";
import { Text, Rect, Transformer } from 'react-konva';

const TextCanvas = (props) => {
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
    if(g === props.shapeProps.g) {
      props.changeLayer('W', w);
      props.changeLayer('H', h);
    } else {
      props.changeLayer('G', g);
    }
  }

  const fontStyle = (props.shapeProps.style.length === 0) ? 'normal' : props.shapeProps.style.toString().replaceAll(',', ' ');

  return (
    <Fragment>
      <Rect
        ref={shapeRef}
        fill={props.shapeProps.background}
        {...props.shapeProps}
        rotation={props.shapeProps.g}
      />
      <Text
        onClick={props.onSelect}
        ref={shapeRef}
        fill={props.shapeProps.fontColor}
        rotation={props.shapeProps.g}
        fontStyle={fontStyle}
        {...props.shapeProps}
        shadowEnabled={props.shapeProps.dropShadow}
        shadowOffsetX={props.shapeProps.fontSize / 10}
        shadowOffsetY={props.shapeProps.fontSize / 10}
        draggable={props.isSelected}
        onDragEnd={(e) => onMove(e.target.x(), e.target.y())}
        onTransformEnd={() => {
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

export default TextCanvas;