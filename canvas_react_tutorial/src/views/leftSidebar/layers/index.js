import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getLayers } from "../../../redux/actions";
import { getCurScene, getListLayer } from "../../../redux/selectors";
import Header from "./header";
import Layer from "./layer";

const Layers = ({ curScene, layers }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(!layers) {
      dispatch(getLayers());
    };
  });

  const renderLayers = (layers, curScene) => {
    if(!layers) return;
    let listLayer = [];
    for(let i = 0; i < layers.length; i++) {
      if(layers[i].scene === curScene) {
        listLayer.push(<Layer key={`layer-${layers[i].num}`} nameLayer={layers[i].name} type={layers[i].type} />);
      };
    };
    return listLayer;
  };

  return(
    <div>
      <Header curScene={curScene}/>
      <div className='list-layer'>
        {renderLayers(layers, curScene)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  layers: getListLayer(state),
  curScene: getCurScene(state),
});

export default connect(mapStateToProps)(Layers);