import { Animation } from "konva/lib/Animation";
import { Fragment, useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import useVideo from "./useVideo";

const Video = (props) => {
  const video = useVideo(props.shapeProps.src);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (props.isSelected && !props.shapeProps.lock) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
    const anim = new Animation(() => {
      // do nothing in animation, it will just automatically redraw a layer
    }, [shapeRef.current.getLayer()]);
    anim.start();
    return () => anim.stop();
  }, [video, props.isSelected, props.shapeProps.lock]);

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
      props.changeLayer('W', w);
      props.changeLayer('H', h);
      props.changeLayer('G', g);
    }
  }

  return (
    <Fragment>
      <Image
        onClick={props.onSelect}
        ref={shapeRef}
        image={video}
        rotation={props.shapeProps.g}
        {...props.shapeProps}
        draggable={props.isSelected  && !props.shapeProps.lock}
        visible={!props.shapeProps.hidden}
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

export default Video;