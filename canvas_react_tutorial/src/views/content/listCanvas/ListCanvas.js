import CircleCanvas from './Circle';
import Rectangle from './Rectangle';
import TextCanvas from './TextCanvas';
import Triangle from './Triangle';
import ImageCanvas from './Image';
import Video from './Video';
import YoutubeCanvas from './YoutubeCanvas';


const ListCanvas = ({ layers, curLayer, curScene, changeLayer, onSelect }) => {
  const renderCanvas = (layers, curLayer, curScene) => {
    if(!layers) return;
    const listCanvas = [];
    for(let i =0; i < layers.length; i++) {
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