import {
  ADD_LAYER,
  ADD_SCENE,
  CHANGE_LAYER,
  CHANGE_NAME_LAYER,
  CHANGE_NAME_SCENE,
  CHANGE_CUR_SCENE,
  CREATE_THUMBNAIL,
  DEL_LAYER,
  DEL_SCENE,
  DEL_VIDEO_LAYER,
  DUPLICATE_LAYER,
  DUPLICATE_SCENE,
  MUTE_MIC,
  REDO,
  UNDO,
  ZOOMIN_LAYER,
  ZOOMOUT_LAYER,
} from '../actionTypes';

const initialState = {
  history: [],
  // number of times undo layer
  layer: 0,
  // number of times undo scene
  scene: 0,
  // number of times undo of both
  num: 0,
}

const listHistory = (state = initialState, action) => {
  const length = state.history.length;
  switch (action.type) {
    case UNDO: {
      return {
        ...state,
        num: state.num + 1,
        layer: (state.history[length - state.num - 1].indexOf('layer') >= 0) ? state.layer + 1 : state.layer,
        scene: (state.history[length - state.num - 1].indexOf('scene') >= 0) ? state.scene + 1 : state.scene,
      }
    }
    case REDO: {
      return {
        ...state,
        num: state.num - 1,
        layer: (state.history[length - state.num].indexOf('layer') >= 0) ? state.layer - 1 : state.layer,
        scene: (state.history[length - state.num].indexOf('scene') >= 0) ? state.scene - 1 : state.scene,
      }
    }
    case ADD_LAYER: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'layer',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case ADD_SCENE: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'scene',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case CHANGE_LAYER: {
      if(length - state.num > 0 && state.history[length - state.num - 1] !== 'layer scene' && state.history[length - state.num - 1].substring(6) === action.payload.type) {
        return {
          history: [
            ...state.history.slice(0, length - state.num),
          ],
          num: 0,
          layer: 0,
          scene: 0,
        }
      }
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          action.payload.type ? 'layer ' + action.payload.type : 'layer',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case CHANGE_NAME_LAYER: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'layer',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case CHANGE_NAME_SCENE: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'scene',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case CHANGE_CUR_SCENE: {
      return {
        ...state,
        history: [
          ...state.history.slice(0, length - state.num),
          'scene',
          ...state.history.slice(length - state.num),
        ],
      }
    }
    case CREATE_THUMBNAIL: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'scene',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case DEL_LAYER: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'layer',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case DEL_SCENE: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'scene layer',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case DEL_VIDEO_LAYER: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'layer',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case DUPLICATE_LAYER: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'layer',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case DUPLICATE_SCENE: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'scene layer',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case MUTE_MIC: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'layer',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case ZOOMIN_LAYER: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'layer',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    case ZOOMOUT_LAYER: {
      return {
        history: [
          ...state.history.slice(0, length - state.num),
          'layer',
        ],
        num: 0,
        layer: 0,
        scene: 0,
      }
    }
    default:
      return state;
  }
}

export default listHistory;