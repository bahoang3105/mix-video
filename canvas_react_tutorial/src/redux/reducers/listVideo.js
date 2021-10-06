import {
  ADD_VIDEO,
  DEL_VIDEO,
  SWITCH_VIDEO,
  MUTE_MIC,
  CHANGE_NAME_VIDEO,
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
        mute: false,
        onCamera: true,
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
    case SWITCH_VIDEO: {
      const place = state.videos.findIndex(video => video.num === action.payload.video);
      return {
        ...state,
        videos: [
          ...state.videos.slice(0, place),
          {
            ...state.videos[place],
            onCamera: !state.videos[place].onCamera,
          },
          ...state.videos.slice(place+1),
        ]
      }
    }
    case MUTE_MIC: {
      const place = state.videos.findIndex(video => video.num === action.payload.video);
      return {
        ...state,
        videos: [
          ...state.videos.slice(0, place),
          {
            ...state.videos[place],
            mute: !state.videos[place].mute,
          },
          ...state.videos.slice(place+1),
        ]
      }
    }
    case CHANGE_NAME_VIDEO: {
      const place = state.videos.findIndex(video => video.num === action.payload.video);
      return {
        ...state,
        videos: [
          ...state.videos.slice(0, place),
          {
            ...state.videos[place],
            name: action.payload.newName,
          },
          ...state.videos.slice(place+1),
        ]
      }
    }
    default:
      return state;
  }
};

export default listVideo;