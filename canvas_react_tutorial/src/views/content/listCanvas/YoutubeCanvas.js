import { Fragment, useEffect, useRef } from "react";
import { Rect, Transformer } from "react-konva";

const YoutubeCanvas = (props) => {
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

  const onChange = (x, y, w, h) => {
    props.changeLayer('G', 0);
    props.changeLayer('W', w);
    props.changeLayer('H', h);
    props.changeLayer('X', x);
    props.changeLayer('Y', y);
  }

  return (
    <Fragment>
      <Rect
        onClick={props.onSelect}
        ref={shapeRef}
        fill={props.shapeProps.background}
        rotation={props.shapeProps.g}
        visible={!props.shapeProps.hidden}
        {...props.shapeProps}
        draggable={props.isSelected  && !props.shapeProps.lock}
        onDragEnd={(e) => onMove(e.target.x(), e.target.y())}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange(node.x(), node.y(), node.width() * scaleX, node.height() * scaleY);
        }}
      />
      {props.isSelected && !props.shapeProps.lock && (
        <Transformer
        rotateEnabled={false}
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

export default YoutubeCanvas;