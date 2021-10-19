import { Stage, Layer } from "react-konva";
import { connect, useDispatch } from "react-redux";
import { changeLayer, getLayers, changeCurLayer } from "../../redux/actions";
import { getCurLayer, getCurScene, getListLayer, getListScene } from "../../redux/selectors";
import YoutubeIframe from "./YoutubeIframe";
import ListCanvas from "./listCanvas/ListCanvas";
import AudioTag from "./AudioTag";
import MicroTag from './MicroTag';
import { useEffect, useRef } from "react";

const Main = ({ layers, curLayer, curScene, scenes, changeLayer, changeCurLayer, size }) => {
  const dataScene = scenes.find(scene => scene.num === curScene);
  const layerRef = useRef(null);
  useEffect(() => {
    const canvas = layerRef.current.getCanvas()._canvas;
    canvas.style.filter = `contrast(${dataScene.contrast}) brightness(${dataScene.brightness}) grayscale(${dataScene.grayscale}) saturate(${dataScene.saturate}) blur(${dataScene.blur}px) sepia(${dataScene.sepia})`;
    canvas.style.opacity = dataScene.opacity;
  })

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

  const renderYoutube = () => {
    const youtubeLayers = layers ? layers.filter(layer => layer.type === 'youtube') : null;
    if(!youtubeLayers) return;
    const listYoutube = [];
    for(let i = 0; i < youtubeLayers.length; i++) {
      if(youtubeLayers[i].scene === curScene) {
        listYoutube.push(
          <YoutubeIframe data={youtubeLayers[i]} key={`youtube-iframe-${youtubeLayers[i].num}`} curLayer={curLayer.num} />
        );
      }
    }
    return listYoutube;
  }

  const renderAudioUploaded = () => {
    const audioUploadedLayers = layers ? layers.filter(layer => layer.type === 'audio') : null;
    if(!audioUploadedLayers) return;
    const listAudio = [];
    for(let i = 0; i < audioUploadedLayers.length; i++) {
      if(audioUploadedLayers[i].scene === curScene) {
        listAudio.push(
          <AudioTag data={audioUploadedLayers[i]} key={audioUploadedLayers[i].num} curLayer={curLayer.num} />
        );
      }
    }
    return listAudio;
  }

  const renderMicro = () => {
    const micros = layers ? layers.filter(layer => layer.type === 'micro') : null;
    if(micros) return;
    const listMicro = [];
    for(let i = 0; i < micros.length; i++) {
      if(micros[i].scene) {
        listMicro.push(
          <MicroTag data={micros[i]} key={micros[i].num} />
        );
      }
    }
    return listMicro;
  }

  return (
    <div>
      {renderYoutube()}
      {renderAudioUploaded()}
      {renderMicro()}
      <Stage
        width={size.width}
        height={size.height - 170 }
        style={{ backgroundColor: '#969ca5' }}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer ref={layerRef}>
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