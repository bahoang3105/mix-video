import { Fragment, useEffect, useRef } from "react";
import { Group, Rect, Transformer } from "react-konva";
import { Html } from 'react-konva-utils';

const Youtube = (props) => {
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
      props.changeLayer('W', w);
      props.changeLayer('H', h);
      props.changeLayer('G', g);
    }
  }
  const src = props.shapeProps.src.replace('watch?v=', 'embed/') + '?autoplay=1?controls=0';

  const iframeTag = document.querySelector("iframe");
  const win = iframeTag.contentWindow;
  console.log(win)

  return (
    <Fragment>
      <Group
        onClick={props.onSelect}
        ref={shapeRef}
        fill={props.shapeProps.background}
        rotation={props.shapeProps.g}
        {...props.shapeProps}
        draggable={props.isSelected}
        onDragEnd={(e) => onMove(e.target.x(), e.target.y())}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange(node.width() * scaleX, node.height() * scaleY, node.rotation());
        }}
      >
        <Rect
          width={props.shapeProps.width}
          height={props.shapeProps.height}
          x={0}
          y={0}
        />
        <Html>
          <iframe width={props.shapeProps.width} height={props.shapeProps.height} src={src} title="YouTube video player" frameBorder="0"></iframe>
        </Html>
      </Group>
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

export default Youtube;