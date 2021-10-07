import { Stage, Layer } from "react-konva";
import { connect, useDispatch } from "react-redux";
import { changeLayer, getLayers, changeCurLayer } from "../../redux/actions";
import { getCurLayer, getCurScene, getListLayer } from "../../redux/selectors";
import ListCanvas from "./listCanvas/ListCanvas";

const Main = ({ layers, curLayer, curScene, changeLayer, changeCurLayer }) => {
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

  const changeLayerCanvas = (type, value) => {
    changeLayer(type, value, curLayer.num);
  }

  const onSelect = layer => {
    changeCurLayer(layer);
  }

  return (
    <Stage
      width={1270}
      height={700}
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
  );
}

const mapStateToProps = state => ({
  layers: getListLayer(state),
  curScene: getCurScene(state),
  curLayer: getCurLayer(state),
})

export default connect(
  mapStateToProps,
  { changeLayer, changeCurLayer }, 
)(Main);