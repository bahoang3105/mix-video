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
    const element = document.createElement('video');
    element.src = props.shapeProps.src;
    element.muted = props.shapeProps.mute;
    element.volume = props.shapeProps.volume/100;
    element.loop = props.shapeProps.loop;
    element.controls = false;
    return element;
    // eslint-disable-next-line
  }, [props.shapeProps.src]);

  useEffect(() => {
    if(props.shapeProps.start) {
      if(!props.shapeProps.pause) {
        video.play();
      } else {
        video.pause()
      }
    }
    const anim = new Animation(() => {
      // do nothing in animation, it will just automatically redraw a layer
    }, [shapeRef.current.getLayer()]);
    anim.start();
    return () => anim.stop();
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
  });

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