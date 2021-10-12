import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getLayers } from "../../../redux/actions";
import { getCurLayer, getCurScene, getListLayer } from "../../../redux/selectors";
import Header from "./header";
import Layer from "./layer";

const Layers = ({ curScene, layers, curLayer }) => {
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
    for(let i = 0; i < layers.length; i++) {
      if(layers[i].scene === curScene) {
        if((lock && !layers[i].lock) || !lock) {
        listLayer.push(
            <Layer 
              key={`layer-${layers[i].num}`} 
              nameLayer={layers[i].name} 
              type={layers[i].type} 
              id={layers[i].num} 
              selectedLayer={num}
              hidden={layers[i].hidden}
              lock={layers[i].lock}
              data={layers[i]}
            />
          );
        }
      };
    };
    return listLayer;
  };

  return(
    <div>
      <Header curScene={curScene} lock={lock} setLock={setLock} />
      <div className='list-layer'>
        {renderLayers(layers, curScene, curLayer)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  layers: getListLayer(state),
  curScene: getCurScene(state),
  curLayer: getCurLayer(state),
});

export default connect(mapStateToProps)(Layers);