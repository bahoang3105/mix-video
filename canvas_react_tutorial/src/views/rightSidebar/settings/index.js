import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getCurLayer } from "../../../redux/selectors";
import Circle from "./Circle";
import Image from "./Image";
import Rectangle from "./Rectangle";
import Text from './Text';
import Triangle from "./Triangle";
import VideoStream from "./VideoStream";
import VideoUploaded from "./VideoUploaded";
import Youtube from "./Youtube";

const Settings = ({ curLayer, display }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(curLayer === null) {
      dispatch(getCurLayer());
    };
  });

  const renderSettings = curLayer => {
    if(curLayer.length === 0) return;
    switch(curLayer.type) {
      case 'text': {
        return (
          <Text data={curLayer} />
        );
      }
      case 'rectangle': {
        return (
          <Rectangle data={curLayer} />
        );
      }
      case 'circle': {
        return (
          <Circle data={curLayer} />
        );
      }
      case 'triangle': {
        return(
          <Triangle data={curLayer} />
        );
      }
      case 'image': {
        return(
          <Image data={curLayer} />
        );
      }
      case 'camera': {
        return(
          <VideoStream data={curLayer} />
        );
      }
      case 'screen': {
        return(
          <VideoStream data={curLayer} />
        );
      }
      case 'youtube': {
        return(
          <Youtube data={curLayer} />
        );
      }
      case 'video': {
        return(
          <VideoUploaded data={curLayer} />
        );
      }
      default:
        return;
    }
  }
  return(
    <div style={{ display: display ? 'block' : 'none'}}>
      {renderSettings(curLayer)}
    </div>
  );
};

const mapStateToProps = state => ({
  curLayer: getCurLayer(state),
});

export default connect(mapStateToProps)(Settings);

export const setValue = (type, value, changeLayer, data) => {
  const checkValue = (type === 'background') ? value : ((value) ? value : 0);
  switch (type) {
    case 'X': {
      const layer = {
        ...data,
        x: parseInt(checkValue),
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'Y': {
      const layer = {
        ...data,
        y: parseInt(checkValue),
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'G': {
      const layer = {
        ...data,
        g: parseInt(checkValue),
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'W': {
      const layer = {
        ...data,
        width: parseInt(checkValue),
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'H': {
      const layer = {
        ...data,
        height: parseInt(checkValue),
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'transparency': {
      const layer = {
        ...data,
        opacity: parseInt(checkValue) / 100,
      }
      changeLayer(layer, data.num, 'transparency');
      break;
    }
    case 'background': {
      const layer = {
        ...data,
        background: checkValue,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'flip': {
      const layer = {
        ...data,
        flip: !data.flip,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'corner': {
      const layer = {
        ...data,
        cornerRadius: parseInt(checkValue),
      }
      changeLayer(layer, data.num, 'corner');
      break;
    }
    case 'align': {
      const layer = {
        ...data,
        align: checkValue,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'text': {
      const layer = {
        ...data,
        text: value,
      }
      changeLayer(layer, data.num, 'text');
      break;
    }
    case 'fontFamily': {
      const layer = {
        ...data,
        fontFamily: checkValue,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'fontSize': {
      const layer = {
        ...data,
        fontSize: parseInt(checkValue),
      }
      changeLayer(layer, data.num, 'fontSize');
      break;
    }
    case 'fontStyle': {
      const style = data.style;
      const exist =  style.findIndex(s => s === checkValue);
      const newStyle =  (exist >= 0) ? [...style.slice(0, exist), ...style.slice(exist + 1)] : [...style, checkValue];
      const layer = {
        ...data,
        style: newStyle,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'textDecoration': {
      const newValue = (data.textDecoration === 'none') ? 'underline' : 'none';
      const layer = {
        ...data,
        textDecoration: newValue,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'fontColor': {
      const layer = {
        ...data,
        fontColor: checkValue,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'animation': {
      const layer = {
        ...data,
        animation: !data.animation,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'speed': {
      const layer = {
        ...data,
        speed: checkValue,
      }
      changeLayer(layer, data.num, 'speed');
      break;
    }
    case 'dropShadow': {
      const layer = {
        ...data,
        dropShadow: !data.dropShadow,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'direction': {
      const layer = {
        ...data,
        direction: checkValue,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'shadowColor': {
      const layer = {
        ...data,
        shadowColor: checkValue,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'start': {
      const layer = {
        ...data,
        start: value,
        pause: false,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'pause': {
      const layer = {
        ...data,
        pause: value,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'autoplay': {
      const layer = {
        ...data,
        autoplay: !data.autoplay,
        start: data.autoplay ? data.start : true,
        pause: data.autoplay ? data.pause : false,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'loop': {
      const layer = {
        ...data,
        loop: !data.loop,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'mute': {
      const layer = {
        ...data,
        mute: !data.mute,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'volume': {
      const layer = {
        ...data,
        volume: checkValue,
      }
      changeLayer(layer, data.num, 'volume');
      break;
    }
    case 'lock': {
      const layer = {
        ...data,
        lock: !data.lock,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'hidden': {
      const layer = {
        ...data,
        hidden: !data.hidden,
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'brightness': {
      const layer = {
        ...data,
        brightness: value/100
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'blur': {
      const layer = {
        ...data,
        blur: value
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'saturate': {
      const layer = {
        ...data,
        saturate: value/100
      }
      changeLayer(layer, data.num);
      break;
    }
    case 'contrast': {
      const layer = {
        ...data,
        contrast: value/100
      }
      changeLayer(layer, data.num);
      break;
    }
    default:
      break;
  }
}