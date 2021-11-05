import { Animation } from "konva/lib/Animation";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Image, Transformer } from "react-konva";
import usePreview from "./usePreview";

const VideoUpload = (props) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [size, setSize] = useState({ width: 50, height: 50 });

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

  const video = useMemo(() => {
    return document.createElement('video');
  }, []);

  video.setAttribute('crossOrigin', 'anonymous');

  useEffect(() => {
    video.muted = props.shapeProps.mute;
    video.volume = props.shapeProps.volume/100;
    video.loop = props.shapeProps.loop;
    video.controls = false;
    video.src = props.shapeProps.src;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(props.shapeProps.start) {
      if(!props.shapeProps.pause) {
        video.play();
      } else {
        video.pause()
      }
      const anim = new Animation(() => {
        if(props.shapeProps.start) {
          if(shapeRef.current !== null) {
            shapeRef.current.cache();
          }
        }
      }, [shapeRef.current.getLayer()]);
      anim.start();
      return () => anim.stop();
    }
  }, [video, props.shapeProps.pause, props.shapeProps.start]);

  useEffect(() => {
    const onload = () => {
      setSize({
        width: video.videoWidth,
        height: video.videoHeight
      });
    };
    video.addEventListener("loadedmetadata", onload);
    return () => {
      video.removeEventListener("loadedmetadata", onload);
    };
  }, [video]);

  const preview = usePreview(props.shapeProps.src);

  return (
    <Fragment>
      <Image
        onClick={props.onSelect}
        ref={shapeRef}
        image={props.shapeProps.start ? video : preview}
        height={size.height}
        width={size.width}
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

export default VideoUpload;