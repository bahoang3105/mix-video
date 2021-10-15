import { Animation } from "konva/lib/Animation";
import { Fragment, useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";

const VideoUpload = (props) => {
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
  
  const video = document.createElement('video');
  video.src = 'https://my-file-manager.s3.ap-southeast-1.amazonaws.com/8aa2b60c-f3b0-4191-982f-944e0f34f84b.mp4?AWSAccessKeyId=AKIAUSPIFCAQZ5XVHELC&Expires=1634353369&Signature=LQhlsYprqNiCUyFI%2B%2BdKZMFcrIA%3D';

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

export default VideoUpload;