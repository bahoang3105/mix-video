import {
  ADD_LAYER,
  ADD_SCENE,
  ADD_TO_SCENE,
  ADD_VIDEO,
  CHANGE_LAYER,
  CREATE_THUMBNAIL,
  DEL_LAYER,
  DEL_SCENE,
  DEL_VIDEO,
  DUPLICATE_LAYER,
  DUPLICATE_SCENE,
  GET_LAYERS,
  GET_SCANES,
  GET_VIDEOS,
  HIDE_LAYER,
  LOCK_LAYER,
  STOP_VIDEO,
  ZOOMIN_LAYER,
  ZOOMOUT_LAYER,
} from './actionTypes';

export const addLayer = (type, scene) => ({
  type: ADD_LAYER,
  payload: {
    scene,
    type,
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

export const duplicateScene = scane => ({
  type: DUPLICATE_SCENE,
  payload: {
    scene,
  }
});

export const getLayers = () => {
  return (dispatch) => {
    const layers = localStorage.getItem('layers');
    dispatch({
      type: GET_LAYERS,
      payload: {
        layers,
      }
    });
  };
};

export const getVideos = () => {
  return (dispatch) => {
    const videos = localStorage.getItem('videos');
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
    const scenes = localStorage.getItem('scenes');
    dispatch({
      type: GET_SCANES,
      payload: {
        scenes,
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