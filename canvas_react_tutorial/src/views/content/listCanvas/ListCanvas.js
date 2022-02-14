import CircleCanvas from './Circle';
import Rectangle from './Rectangle';
import TextCanvas from './TextCanvas';
import Triangle from './Triangle';
import ImageCanvas from './Image';
import Video from './Video';
import YoutubeCanvas from './YoutubeCanvas';
import VideoUpload from './VideoUpload';
import Audio from './Audio';
import Konva from 'konva';
import RTMP from './RTMP';


const ListCanvas = ({ layers, curLayer, curScene, changeLayer, onSelect, dataScene }) => {
  const renderCanvas = (layers, curLayer, curScene) => {
    const filters = dataScene.grayscale ? 
      [Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.HSL, Konva.Filters.RGBA, Konva.Filters.Blur, Konva.Filters.Grayscale] :
      [Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.HSL, Konva.Filters.RGBA, Konva.Filters.Blur];
    if(!layers) return;
    const listCanvas = [];
    for(let i = layers.length - 1; i >= 0; i--) {
      if(layers[i].scene === curScene) {
        switch(layers[i].type) {
          case 'rectangle': {
            listCanvas.push(
              <Rectangle
                key={`rectangle-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          case 'circle': {
            listCanvas.push(
              <CircleCanvas
                key={`circle-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          case 'triangle': {
            listCanvas.push(
              <Triangle
                key={`triangle-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          case 'text': {
            listCanvas.push(
              <TextCanvas
                key={`text-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          case 'image': {
            listCanvas.push(
              <ImageCanvas
                key={`image-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          case 'imageUpload': {
            listCanvas.push(
              <ImageCanvas
                key={`image-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          case 'camera': {
            listCanvas.push(
              <Video
                key={`camera-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          case 'screen': {
            listCanvas.push(
              <Video
                key={`screen-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          case 'youtube': {
            listCanvas.push(
              <YoutubeCanvas
                key={`youtube-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          case 'video': {
            listCanvas.push(
              <VideoUpload
                key={`video-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          case 'audio': {
            listCanvas.push(
              <Audio
                key={`video-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          case 'micro': {
            listCanvas.push(
              <Audio
                key={`video-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          case 'rtmp': {
            listCanvas.push(
              <RTMP
                key={`rtmp-${i}`}
                shapeProps={layers[i]}
                isSelected={layers[i].num === curLayer.num}
                changeLayer={changeLayer}
                onSelect={() => onSelect(layers[i].num)}
                dataScene={dataScene}
                filters={filters}
              />
            );
            break;
          }
          default:
            break;
        }
      }
    }
    return listCanvas;
  }
  return (
    <>
      {renderCanvas(layers, curLayer, curScene)}
    </>
  );
}

export default ListCanvas;