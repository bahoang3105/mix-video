import {
  ADD_VIDEO,
  GET_VIDEOS,
  DEL_VIDEO,
  STOP_VIDEO,
} from '../actionTypes';

const initialState = {
  videos: null,
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
    default:
      return state;
  }
};

export default listVideo;