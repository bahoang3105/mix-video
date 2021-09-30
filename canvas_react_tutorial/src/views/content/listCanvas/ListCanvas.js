import CircleCanvas from './Circle';
import Rectangle from './Rectangle';
import Triangle from './Triangle';

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