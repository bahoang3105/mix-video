import { Stage, Layer } from "react-konva";
import { connect, useDispatch } from "react-redux";
import { changeLayer, getLayers, changeCurLayer, getScenes } from "../../redux/actions";
import { getCurLayer, getCurScene, getListLayer, getListScene } from "../../redux/selectors";
import YoutubeIframe from "./YoutubeIframe";
import ListCanvas from "./listCanvas/ListCanvas";
import AudioTag from "./AudioTag";
import MicroTag from './MicroTag';
import { useEffect, useRef } from "react";
import Publish from './Publish';

const Main = ({ name, layers, curLayer, curScene, scenes, changeLayer, changeCurLayer, size, publish }) => {
  const dataScene = scenes.find(scene => scene.num === curScene);
  const layerRef = useRef(null);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if(!layers) {
      dispatch(getLayers());
    }
    if(!scenes || scenes.length === 0) {
      dispatch(getScenes());
    }
  });

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
  
  useEffect(() => {
    if(publish) {
      try {
        const nameStream = name.replaceAll(' ', '');
        const publishStream = Publish.create();
        publishStream.stream = layerRef.current.getCanvas()._canvas.captureStream(256);
        publishStream.startStreaming(`ws://localhost:3333/app/${nameStream}?direction=send`);
      } catch (err) {
        console.error(err);
      }
    }
  // eslint-disable-next-line
  },[publish]);

  if(!layers || !scenes || scenes.length === 0) {
    return <div/>;
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
            dataScene={dataScene}
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