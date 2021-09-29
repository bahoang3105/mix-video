import layers from '../../views/leftSidebar/layers';
import {
  ADD_LAYER,
  DEL_LAYER,
  DUPLICATE_LAYER,
  GET_LAYERS,
  LOCK_LAYER,
  HIDE_LAYER,
  CHANGE_LAYER,
  CHANGE_CUR_LAYER,
  ZOOMIN_LAYER,
  ZOOMOUT_LAYER,
  ADD_TO_SCENE,
} from '../actionTypes';

const initialState = {
  layers: null,
  num: null,
  curLayer: [],
};

const listLayer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_LAYER: {
      let newLayer;
      switch(action.payload.type) {
        case 'text': {
          newLayer = {
            "name": "Text " + state.num,
            "type": action.payload.type,
            "scene": action.payload.curScene,
            "num": state.num,
            "x": 0,
            "y": 0,
            "g": 0,
            "w": 100,
            "h": 100,
          }
          break;
        }
        default:
          newLayer = {}
      }
      const curLayer = (state.curLayer.length === 0) ? newLayer : state.curLayer;
      if(!state.layers) {
        return {
          ...state,
          layers: [newLayer],
          num: 2,
          curLayer: curLayer,
        }
      }
      return {
        ...state,
        layers: [...state.layers, newLayer],
        num: state.num + 1,
        curLayer: state.curLayer,
      };
    }
    case ADD_TO_SCENE: {

      return;
    }
    case DEL_LAYER: {
      const { layer } = action.payload;
      const place = state.layers.findIndex(Layer => Layer.num === parseInt(layer));
      console.log(state.curLayer)
      const curLayer = (state.curLayer.length === 0) ? [] : (state.curLayer.num === layers[place].num) ? [] : state.curLayer;
      return {
        ...state,
        layers: [
          ...state.layers.slice(0, place),
          ...state.layers.slice(place+1)
        ],
        curLayer: curLayer,
        num: state.num,
      }
    }
    case DUPLICATE_LAYER: {

      return;
    }
    case GET_LAYERS: {
      return {
        ...state,
        layers: action.payload.layers,
        num: action.payload.num,
        curLayer: state.curLayer,
      };
    }
    case LOCK_LAYER: {

      return;
    }
    case HIDE_LAYER: {

      return;
    }
    case CHANGE_LAYER: {

      return;
    }
    case CHANGE_CUR_LAYER: {
      const curLayer = state.layers.find(Layer => Layer.num === action.payload.layer);
      return {
        ...state,
        layers: state.layers,
        num: state.num,
        curLayer: curLayer,
      }
    }
    case ZOOMIN_LAYER: {

      return;
    }
    case ZOOMOUT_LAYER: {

      return;
    }
    default:
      return state;
  }
};

export default listLayer;