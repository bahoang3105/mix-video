import { Animation } from "konva/lib/Animation";
import { Fragment, useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";
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
      try {
        shapeRef.current.cache();
      } catch (err) {
        // do nothing
      }
    }, [shapeRef.current.getLayer()]);
    anim.start();
    return () => {
      anim.stop();
    }
  }, [video, props.isSelected, props.shapeProps.lock]);

  const onMove = (x, y) => {
    const layer = {
      ...props.shapeProps,
      x: parseInt(x),
      y: parseInt(y),
    }
    props.changeLayer(layer);
  }

  const onChange = (x, y, w, h, g) => {
    if(g === props.shapeProps.g) {
      const layer = {
        ...props.shapeProps,
        x: parseInt(x),
        y: parseInt(y),
        width: parseInt(w),
        height: parseInt(h),
      }
      props.changeLayer(layer);
    } else {
      const layer = {
        ...props.shapeProps,
        x: parseInt(x),
        y: parseInt(y),
        width: parseInt(w),
        height: parseInt(h),
        g: parseInt(g),
      }
      props.changeLayer(layer);
    }
  }
  
  const [img] = useImage('https://cdn0.iconfinder.com/data/icons/photo-and-video-14/60/stop__block__camera__no__gadget-512.png', 'anonymous');

  return (
    <Fragment>
      <Image
        onClick={props.onSelect}
        ref={shapeRef}
        image={props.shapeProps.camera ? video : img}
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
        filters={props.filters}
        brightness={props.dataScene.brightness - 1}
        contrast={(props.dataScene.contrast - 1) * 100}
        blurRadius={props.dataScene.blur}
        saturation={props.dataScene.saturate - 1}
        red={props.dataScene.red}
        green={props.dataScene.green}
        blue={props.dataScene.blue}
        alpha={props.dataScene.alpha}
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