import axios from 'axios';
import BaseUrl from './../BaseUrl';
import {
  ADD_LAYER,
  ADD_SCENE,
  ADD_VIDEO,
  CHANGE_NAME_LAYER,
  CHANGE_NAME_SCENE,
  CHANGE_NAME_VIDEO,
  CHANGE_LAYER,
  CHANGE_CUR_LAYER,
  CHANGE_SCENE,
  CREATE_THUMBNAIL,
  DEL_LAYER,
  DEL_SCENE,
  DEL_VIDEO,
  DEL_VIDEO_LAYER,
  DUPLICATE_LAYER,
  DUPLICATE_SCENE,
  GET_LAYERS,
  GET_SCENES,
  SWITCH_VIDEO,
  MOVE_LAYER,
  MUTE_MIC,
  ZOOMIN_LAYER,
  ZOOMOUT_LAYER,
  CHANGE_CUR_SCENE,
  SWITCH_STATE_VIDEO,
  UNDO,
  REDO,
  CHANGE_STATE_LAYERS,
  CHANGE_STATE_SCENES,
  ADD_STREAM,
  // RENEW_URL,
} from './actionTypes';

export const addLayer = (type, curScene, details) => ({
  type: ADD_LAYER,
  payload: {
    type,
    curScene,
    details,
  }
});

export const addStream = (link, curScene) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:3001/rtmp/publish', { link });
      dispatch({
        type: ADD_STREAM,
        payload: {
          curScene,
          details: {
            link,
          }
        }
      })
    } catch (err) {
      alert('This stream does not exist!');
    }
  }
}

export const addScene = () => ({
  type: ADD_SCENE,
});

export const addVideo = (type, name, details) => ({
  type: ADD_VIDEO,
  payload: {
    type,
    name,
    details,
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

export const changeLayer = (layer, num, type) => ({
  type: CHANGE_LAYER,
  payload: {
    layer,
    num,
    type,
  }
});

// export const renewUrl = (fileKey, url) => ({
//   type: RENEW_URL,
//   payload: {
//     fileKey,
//     url,
//   }
// });

export const changeScene = (scene, num, type) => ({
  type: CHANGE_SCENE,
  payload: {
    scene,
    num,
    type,
  }
})

export const createThumbnail = (img, scene) => ({
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

export const duplicateScene = (scene, numScene) => ({
  type: DUPLICATE_SCENE,
  payload: {
    scene,
    numScene,
  }
});

export const getLayers = () => {
  return async (dispatch) => {
    try {
      const layers = await axios.get(BaseUrl + '/app/getLayer', {
        headers: {
          'secret-key': localStorage.getItem('secretKey'),
        }
      });
      const num = await axios.get(BaseUrl + '/app/getLayerNum', {
        headers: {
          'secret-key': localStorage.getItem('secretKey'),
        }
      });
      dispatch({
        type: GET_LAYERS,
        payload: {
          layers: layers.data.layers,
          num: num.data.layerNum,
          history: [{
            layers: layers.data.layers,
            num: num.data.layerNum,
            curLayer: [],
          }],
        }
      });
    } catch (err) {
      console.error(err.response.data.message);
    }
  };
};

export const getScenes = () => {
  return async (dispatch) => {
    try {
      const scenes = await axios.get(BaseUrl + '/app/getScene', {
        headers: {
          'secret-key': localStorage.getItem('secretKey'),
        }
      });
      const num = await axios.get(BaseUrl + '/app/getSceneNum', {
        headers: {
          'secret-key': localStorage.getItem('secretKey'),
        }
      });
      dispatch({
        type: GET_SCENES,
        payload: {
          scenes: scenes.data.scenes,
          num: num.data.sceneNum,
        }
      });
    } catch (err) {
      console.error(err.response.data.message);
    }
  };
};

export const switchVideo = video => ({
  type: SWITCH_VIDEO,
  payload: {
    video,
  }
});

export const moveLayer = (sourceNum, destinationNum) => ({
  type: MOVE_LAYER,
  payload: {
    sourceNum,
    destinationNum,
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

export const switchStateVideo = src => ({
  type: SWITCH_STATE_VIDEO,
  payload: {
    src,
  }
});

export const undo = () => ({
  type: UNDO,
});

export const redo = () => ({
  type: REDO,
});

export const changeStateLayers = num => ({
  type: CHANGE_STATE_LAYERS,
  payload: {
    num,
  }
});

export const changeStateScenes = num => ({
  type: CHANGE_STATE_SCENES,
  payload: {
    num,
  }
});
