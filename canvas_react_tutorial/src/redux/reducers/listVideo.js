import {
  ADD_VIDEO,
  DEL_VIDEO,
  STOP_VIDEO,
} from '../actionTypes';

const initialState = {
  videos: [],
  num: 1,
};

const listVideo = (state = initialState, action) => {
  switch(action.type) {
    case ADD_VIDEO: {
      const newVideo = {
        ...action.payload,
        num: state.num,
        name: action.payload.name,
        src: action.payload.src,
      };
      return {
        ...state,
        videos: [...state.videos, newVideo],
        num: state.num + 1,
      }
    }
    case DEL_VIDEO: {
      const place = state.videos.findIndex(video => video.num === action.payload.video);
      return {
        ...state,
        videos: [
          ...state.videos.slice(0, place),
          ...state.videos.slice(place+1)
        ]
      }
    }
    case STOP_VIDEO: {

      return;
    }
    default:
      return state;
  }
};

export default listVideo;