import {
  ADD_VIDEO,
  GET_VIDEOS,
  DEL_VIDEO,
  STOP_VIDEO,
  GET_AUDIO_DEVICES,
  GET_CAMERA_DEVICES,
} from '../actionTypes';

const initialState = {
  videos: [],
  cameraDevices: null,
  microDevices: null,
};

const listVideo = (state = initialState, action) => {
  switch(action.type) {
    case ADD_VIDEO: {

      return;
    }
    case GET_VIDEOS: {
      return {
        ...state,
        videos: action.payload.videos
      };
    }
    case DEL_VIDEO: {

      return;
    }
    case STOP_VIDEO: {

      return;
    }
    case GET_CAMERA_DEVICES: {
      console.log('huhu')
      return {
        ...state,
        cameraDevices: action.payload,
      }
    }
    case GET_AUDIO_DEVICES: {
      return {
        ...state,
        microDevices: action.payload,
      }
    }
    default:
      return state;
  }
};

export default listVideo;