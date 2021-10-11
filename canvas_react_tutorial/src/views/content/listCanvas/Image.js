import { Fragment, useEffect, useRef } from "react";
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';

const ImageCanvas = (props) => {
  const shapeRef = useRef();
  const trRef = useRef();

  const flipX = props.shapeProps.flip ? -props.shapeProps.scaleX : props.shapeProps.scaleX;
  const flipY = props.shapeProps.scaleY;

  const offsetX = props.shapeProps.flip ? props.shapeProps.width * props.shapeProps.scaleX : 0;

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

  const [img] = useImage(props.shapeProps.src);

  return (
    <Fragment>
      <Image
        onClick={props.onSelect}
        ref={shapeRef}
        rotation={props.shapeProps.g}
        {...props.shapeProps}
        image={img}
        scaleX={flipX}
        scaleY={flipY}
        offsetX={offsetX}
        visible={!props.shapeProps.hidden}
        draggable={props.isSelected  && !props.shapeProps.lock}
        onDragEnd={(e) => onMove(e.target.x(), e.target.y())}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange(node.x(), node.y(), node.width() * scaleX, node.height() * scaleY, node.rotation());
        }}
      />
      {props.isSelected && !props.shapeProps.lock && (
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

export default ImageCanvas;