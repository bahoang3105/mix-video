import { Fragment, useEffect, useRef } from "react";
import { Rect, Transformer } from "react-konva";

const VideoUpload = (props) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (props.isSelected && !props.shapeProps.lock) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [props.isSelected, props.shapeProps.lock]);

  const onMove = (x, y) => {
    const layer = {
      ...props.shapeProps,
      x: parseInt(x),
      y: parseInt(y),
    }
    props.changeLayer(layer);
  }

  const onChange = (x, y, w, h, g) => {
    const layer = {
      ...props.shapeProps,
      x: parseInt(x),
      y: parseInt(y),
      width: parseInt(w),
      height: parseInt(h),
    }
    props.changeLayer(layer);
  }

  return (
    <Fragment>
      <Rect
        onClick={props.onSelect}
        ref={shapeRef}
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

export default VideoUpload;