import { Stage, Layer } from "react-konva";
import { connect, useDispatch } from "react-redux";
import { changeLayer, getLayers, changeCurLayer } from "../../redux/actions";
import { getCurLayer, getCurScene, getListLayer, getListScene } from "../../redux/selectors";
import YoutubeIframe from "./YoutubeIframe";
import ListCanvas from "./listCanvas/ListCanvas";
import VideoTag from "./VideoTag";

const Main = ({ layers, curLayer, curScene, scenes, changeLayer, changeCurLayer, size }) => {
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

  const changeLayerCanvas = (layer) => {
    changeLayer(layer, curLayer.num);
  }

  const onSelect = layer => {
    changeCurLayer(layer);
  }
  
  const dataScene = scenes.find(scene => scene.num === curScene);

  const renderYoutube = () => {
    const youtubeLayers = layers ? layers.filter(layer => layer.type === 'youtube') : null;
    if(!youtubeLayers) return;
    const listYoutube = [];
    for(let i = 0; i < youtubeLayers.length; i++) {
      listYoutube.push(
        <YoutubeIframe data={youtubeLayers[i]} key={`youtube-iframe-${youtubeLayers[i].num}`} curLayer={curLayer.num} />
      );
    }
    return listYoutube;
  }

  const renderVideoUploaded = () => {
    const videoUploadedLayers = layers ? layers.filter(layer => layer.type === 'video') : null;
    if(!videoUploadedLayers) return;
    const listVideo = [];
    for(let i = 0; i < videoUploadedLayers.length; i++) {
      listVideo.push(
        <VideoTag data={videoUploadedLayers[i]} key={videoUploadedLayers[i].num} curLayer={curLayer.num} />
      );
    }
    return listVideo;
  }

  return (
    <div 
      style={{
        filter: `contrast(${dataScene.contrast}) brightness(${dataScene.brightness}) grayscale(${dataScene.grayscale}) saturate(${dataScene.saturate}) blur(${dataScene.blur}px) sepia(${dataScene.sepia})`,
        opacity: dataScene.opacity 
      }}
    >
      {renderYoutube()}
      {renderVideoUploaded()}
      <Stage
        width={size.width}
        height={size.height - 160 }
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
    </div>
  );
}

const mapStateToProps = state => ({
  layers: getListLayer(state),
  curScene: getCurScene(state),
  curLayer: getCurLayer(state),
  scenes: getListScene(state),
})

export default connect(
  mapStateToProps,
  { changeLayer, changeCurLayer }, 
)(Main);