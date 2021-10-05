import {
  ADD_LAYER,
  ADD_SCENE,
  ADD_TO_SCENE,
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
  DUPLICATE_LAYER,
  DUPLICATE_SCENE,
  GET_LAYERS,
  GET_SCENES,
  GET_VIDEOS,
  GET_AUDIO_DEVICES,
  GET_CAMERA_DEVICES,
  HIDE_LAYER,
  LOCK_LAYER,
  STOP_VIDEO,
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

export const addVideo = type => ({
  type: ADD_VIDEO,
  payload: {
    type,
  }
});

export const addToScene = (video, scene) => ({
  type: ADD_TO_SCENE,
  payload: {
    video,
    scene,
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

export const getVideos = () => {
  return (dispatch) => {
    const videos = JSON.parse(localStorage.getItem('videos'));
    dispatch({
      type: GET_VIDEOS,
      payload: {
        videos,
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

export const getMicroDevices = () => {
  return async (dispatch) => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const listMicro = devices.filter(device => device.kind === 'audioinput');
      dispatch({
        type: GET_AUDIO_DEVICES,
        payload: listMicro,
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export const getCameraDevices = () => {
  return async (dispatch) => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const listCamera = devices.filter(device => device.kind === 'videoinput');
      dispatch({
        type: GET_CAMERA_DEVICES,
        payload: listCamera,
      });
    } catch (err) {
      console.error(err);
    }
  }
}

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

export const stopVideo = video => ({
  type: STOP_VIDEO,
  payload: {
    video,
  }
});

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
