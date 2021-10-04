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
    if (props.isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [props.isSelected]);

  const onMove = (x, y) => {
    props.changeLayer('X', x);
    props.changeLayer('Y', y);
  }

  const onChange = (scaleX, scaleY, g) => {
    props.changeLayer('scaleX', scaleX);
    props.changeLayer('scaleY', scaleY);
    props.changeLayer('G', g);
  }

  const [img] = useImage(props.shapeProps.src);

  return (
    <Fragment>
      <Image
        onClick={props.onSelect}
        ref={shapeRef}
        fill={props.shapeProps.background}
        rotation={props.shapeProps.g}
        {...props.shapeProps}
        image={img}
        width={props.shapeProps.width * Math.abs(props.shapeProps.scaleX)}
        height={props.shapeProps.height * Math.abs(props.shapeProps.scaleY)}
        scaleX={flipX}
        scaleY={flipY}
        offsetX={offsetX}
        draggable={props.isSelected}
        onDragEnd={(e) => onMove(e.target.x(), e.target.y())}
        onTransformEnd={() => {
          const node = shapeRef.current;
          console.log(node.attrs)
          onChange(node.scaleX(), node.scaleY(), node.rotation());
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

export default ImageCanvas;