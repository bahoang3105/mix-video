import {
  ADD_LAYER,
  ADD_SCENE,
  ADD_VIDEO,
  CHANGE_NAME_LAYER,
  CHANGE_NAME_SCENE,
  CHANGE_NAME_VIDEO,
  CHANGE_LAYER,
  CHANGE_CUR_LAYER,
  CREATE_THUMBNAIL,
  DEL_LAYER,
  DEL_SCENE,
  DEL_VIDEO,
  DEL_VIDEO_LAYER,
  DUPLICATE_LAYER,
  DUPLICATE_SCENE,
  GET_LAYERS,
  GET_SCENES,
  HIDE_LAYER,
  LOCK_LAYER,
  SWITCH_VIDEO,
  MUTE_MIC,
  ZOOMIN_LAYER,
  ZOOMOUT_LAYER,
  CHANGE_CUR_SCENE,
} from './actionTypes';

export const addLayer = (type, curScene, details) => ({
  type: ADD_LAYER,
  payload: {
    type,
    curScene,
    details,
  }
});

export const addScene = () => ({
  type: ADD_SCENE,
});

export const addVideo = (type, name, src) => ({
  type: ADD_VIDEO,
  payload: {
    type,
    name,
    src,
  }
});

export const changeNameLayer = (newName, layer) => ({
  type: CHANGE_NAME_LAYER,
  payload: {
    newName,
    layer,
  }
});

export const changeNameScene = (newName, scene) => ({
  type: CHANGE_NAME_SCENE,
  payload: {
    newName,
    scene,
  }
});

export const changeCurScene = (scene, sceneName) => ({
  type: CHANGE_CUR_SCENE,
  payload: {
    scene,
    sceneName,
  }
});

export const changeNameVideo = (newName, video) => ({
  type: CHANGE_NAME_VIDEO,
  payload: {
    newName,
    video,
  }
});

export const changeLayer = (field, value, layer) => ({
  type: CHANGE_LAYER,
  payload: {
    field,
    value,
    layer,
  }
});

export const createThumbnail = (scene, img) => ({
  type: CREATE_THUMBNAIL,
  payload: {
    scene,
    img,
  }
});

export const delLayer = layer => ({
  type: DEL_LAYER,
  payload: {
    layer,
  }
});

export const delScene = scene => ({
  type: DEL_SCENE,
  payload: {
    scene,
  }
});

export const delVideo = video => ({
  type: DEL_VIDEO,
  payload: {
    video,
  }
});

export const delVideoLayer = videoSrc => ({
  type: DEL_VIDEO_LAYER,
  payload: {
    videoSrc,
  }
});

export const duplicateLayer = layer => ({
  type: DUPLICATE_LAYER,
  payload: {
    layer,
  }
});

export const duplicateScene = scene => ({
  type: DUPLICATE_SCENE,
  payload: {
    scene,
  }
});

export const getLayers = () => {
  return (dispatch) => {
    const layers = JSON.parse(localStorage.getItem('layers'));
    const num = parseInt(localStorage.getItem('numLayer')) ? parseInt(localStorage.getItem('numLayer')) : 1;
    dispatch({
      type: GET_LAYERS,
      payload: {
        layers,
        num,
      }
    });
  };
};

export const getScenes = () => {
  return (dispatch) => {
    const scenes = JSON.parse(localStorage.getItem('scenes'));
    const num = parseInt(localStorage.getItem('numScene'));
    dispatch({
      type: GET_SCENES,
      payload: {
        scenes,
        num,
      }
    });
  };
};

export const hideLayer = layer => ({
  type: HIDE_LAYER,
  payload: {
    layer,
  }
});

export const lockLayer = layer => ({
  type: LOCK_LAYER,
  payload: {
    layer,
  }
});

export const switchVideo = video => ({
  type: SWITCH_VIDEO,
  payload: {
    video,
  }
});

export const muteMic = video => ({
  type: MUTE_MIC,
  payload: {
    video,
  }
})

export const zoominLayer = layer => ({
  type: ZOOMIN_LAYER,
  payload: {
    layer,
  }
});

export const zoomoutLayer = layer => ({
  type: ZOOMOUT_LAYER,
  payload: {
    layer,
  }
});

export const changeCurLayer = layer => ({
  type: CHANGE_CUR_LAYER,
  payload: {
    layer,
  }
});
