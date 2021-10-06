import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getCurLayer } from "../../../redux/selectors";
import Circle from "./Circle";
import Image from "./Image";
import Rectangle from "./Rectangle";
import Text from './Text';
import Triangle from "./Triangle";
import Video from "./Video";

const Settings = ({ curLayer }) => {
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
          <Video data={curLayer} />
        );
      }
      case 'screen': {
        return(
          <Video data={curLayer} />
        );
      }
      default:
        return;
    }
  }
  return(
    <div>
      {renderSettings(curLayer)}
    </div>
  );
};

const mapStateToProps = state => ({
  curLayer: getCurLayer(state),
});

export default connect(mapStateToProps)(Settings);