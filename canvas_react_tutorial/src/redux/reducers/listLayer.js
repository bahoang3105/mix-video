import {
  ADD_LAYER,
  DEL_LAYER,
  DUPLICATE_LAYER,
  GET_LAYERS,
  LOCK_LAYER,
  HIDE_LAYER,
  CHANGE_LAYER,
  ZOOMIN_LAYER,
  ZOOMOUT_LAYER,
  ADD_TO_SCENE,
} from '../actionTypes';

const initialState = {
  layers: null,
};

const listLayer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_LAYER: {

      return;
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

      return;
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