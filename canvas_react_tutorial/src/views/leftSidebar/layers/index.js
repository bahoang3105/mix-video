import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getLayers } from "../../../redux/actions";
import { getCurLayer, getCurScene, getListLayer } from "../../../redux/selectors";
import Header from "./header";
import Layer from "./layer";

const Layers = ({ curScene, layers, curLayer }) => {
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
        listLayer.push(
          <Layer 
            key={`layer-${layers[i].num}`} 
            nameLayer={layers[i].name} 
            type={layers[i].type} 
            id={layers[i].num} 
            selectedLayer={num}
            hidden={layers[i].hidden}
            lock={layers[i].lock}
          />
        );
      };
    };
    return listLayer;
  };

  return(
    <div>
      <Header curScene={curScene}/>
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