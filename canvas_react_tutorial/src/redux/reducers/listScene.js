import {
  ADD_SCENE,
  GET_SCANES,
  DEL_SCENE,
  DUPLICATE_SCENE,
} from '../actionTypes';

const initialState = {
  scenes: null,
}

const listScene = (state = initialState, action) => {
  switch(action.type) {
    case ADD_SCENE: {

      return;
    }
    case GET_SCANES: {

      return;
    }
    case DEL_SCENE: {

      return;
    }
    case DUPLICATE_SCENE: {

      return;
    }
    default:
      return state;
  }
};

export default listScene;