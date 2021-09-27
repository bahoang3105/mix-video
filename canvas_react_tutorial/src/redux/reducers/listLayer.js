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
      if(!state.layers) {
        return {
          ...state,
          layers: [newLayer],
          num: 2,
        }
      }
      return {
        ...state,
        layers: [...state.layers, newLayer],
        num: state.num + 1,
      };
    }
    case ADD_TO_SCENE: {

      return;
    }
    case DEL_LAYER: {

      return;
    }
    case DUPLICATE_LAYER: {

      return;
    }
    case GET_LAYERS: {
      return {
        ...state,
        layers: action.payload.layers,
        num: action.payload.num,
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
      
      return;
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