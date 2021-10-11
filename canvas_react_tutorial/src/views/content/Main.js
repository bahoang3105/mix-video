import { Stage, Layer } from "react-konva";
import { connect, useDispatch } from "react-redux";
import { changeLayer, getLayers, changeCurLayer } from "../../redux/actions";
import { getCurLayer, getCurScene, getListLayer } from "../../redux/selectors";
import YoutubeIframe from "./YoutubeIframe";
import ListCanvas from "./listCanvas/ListCanvas";

const Main = ({ layers, curLayer, curScene, changeLayer, changeCurLayer, size }) => {
  const dispatch = useDispatch();
  if(!layers) {
    dispatch(getLayers())
  }
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      changeCurLayer(null);
    }
  };

  const changeLayerCanvas = (type, value) => {
    changeLayer(type, value, curLayer.num);
  }

  const onSelect = layer => {
    changeCurLayer(layer);
  }
  const renderYoutube = () => {
    const youtubeLayers = layers ? layers.filter(layer => layer.type === 'youtube') : null;
    if(!youtubeLayers) return;
    const listYoutube = [];
    for(let i = 0; i < youtubeLayers.length; i++) {
      listYoutube.push(
        <YoutubeIframe data={youtubeLayers[i]} key={`youtube-iframe-${i}`} curLayer={curLayer.num} />
      );
    }
    return listYoutube;
  }

  return (
    <>
      {renderYoutube()}
      <Stage
        width={size.width}
        height={size.height - 150 }
        style={{ backgroundColor: '#969ca5' }}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          <ListCanvas 
            layers={layers} 
            curLayer={curLayer} 
            curScene={curScene} 
            changeLayer={changeLayerCanvas}
            onSelect={onSelect}
          />
        </Layer>
      </Stage>
    </>
  );
}

const mapStateToProps = state => ({
  layers: getListLayer(state),
  curScene: getCurScene(state),
  curLayer: getCurLayer(state),
})

export default connect(
  mapStateToProps,
  { changeLayer, changeCurLayer }, 
)(Main);