import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getLayers, moveLayer } from "../../../redux/actions";
import { getCurLayer, getCurScene, getListLayer } from "../../../redux/selectors";
import Header from "./header";
import Layer from "./layer";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Layers = ({ curScene, layers, curLayer, ...props }) => {
  const [lock, setLock] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!layers) {
      dispatch(getLayers());
    };
  });
  
  const renderLayers = (layers, curScene, curLayer) => {
    if(!layers) return;
    const listLayer = [];
    const checkCurLayer = (curLayer === []);
    const num = checkCurLayer ? null : curLayer.num;
    const listLayerInThisScene = layers.filter(layer => layer.scene === curScene && ((lock && !layer.lock) || !lock));
    for(let i = 0; i < listLayerInThisScene.length; i++) {
      listLayer.push(
        <Draggable key={listLayerInThisScene[i].num} draggableId={listLayerInThisScene[i].num + ''} index={i}>
          {(provided) => (
            <div 
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Layer
                nameLayer={listLayerInThisScene[i].name} 
                type={listLayerInThisScene[i].type} 
                id={listLayerInThisScene[i].num} 
                selectedLayer={num}
                hidden={listLayerInThisScene[i].hidden}
                lock={listLayerInThisScene[i].lock}
                data={listLayerInThisScene[i]}
              />
            </div>
          )}
        </Draggable>
      );
    };
    return listLayer;
  };

  const handleOnDragEnd = result => {
    const listLayerInThisScene = layers.filter(layer => layer.scene === curScene && ((lock && !layer.lock) || !lock));
    if(result.source.index !== result.destination.index) {
      props.moveLayer( parseInt(result.draggableId), listLayerInThisScene[result.destination.index].num);
    }
  }

  return(
    <div>
      <Header curScene={curScene} lock={lock} setLock={setLock} />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='list-layer'>
            {(provided) => (
              <div className='list-layer' id='list-layer' {...provided.droppableProps} ref={provided.innerRef}>
                {renderLayers(layers, curScene, curLayer)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
    </div>
  );
};

const mapStateToProps = (state) => ({
  layers: getListLayer(state),
  curScene: getCurScene(state),
  curLayer: getCurLayer(state),
});

export default connect(
  mapStateToProps,
  { moveLayer }
)(Layers);