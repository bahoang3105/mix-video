import {
  ADD_SCENE,
  GET_SCENES,
  DEL_SCENE,
  DUPLICATE_SCENE,
  CREATE_THUMBNAIL,
  CHANGE_CUR_SCENE,
} from '../actionTypes';

const initialState = {
  curScene: null,
  curSceneName: null,
  scenes: null,
  num: 0,
}

const listScene = (state = initialState, action) => {
  const img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/1024px-Solid_black.svg.png';
  switch(action.type) {
    case ADD_SCENE: {
      const newName = 'Scene ' + state.num;
      const newScene = {"id": state.num, "name": newName, "img": img, "num": state.num};
      return {
        ...state,
        scenes: [...state.scenes, newScene],
        num: state.num + 1, 
      };
    }
    case GET_SCENES: {
      if(!action.payload.scenes) {
        const newName = 'Scene 1';
        const newScene = {"name": newName, "img": img, "num": 1};
        return {
          ...state,
          scenes: [newScene],
          curScene: 1,
          curSceneName: 'Scene 1',
          num: 2,
        };
      }
      return {
        ...state,
        scenes: action.payload.scenes,
        curScene: action.payload.scenes[0].num,
        curSceneName: action.payload.scenes[0].name,
        num: action.payload.num,
      };
    }
    case DEL_SCENE: {
      const { scene } = action.payload;
      let place;
      for(let i = 0; i < state.scenes.length; i++) {
        if(scene === state.scenes[i].name) {
          place = i;
          break;
        }
      }
      return {
        ...state,
        scenes: [
          ...state.scenes.slice(0, place),
          ...state.scenes.slice(place+1)
        ]
      };
    }
    case CHANGE_CUR_SCENE: {
      return {
        ...state,
        scenes: state.scenes,
        num: state.num,
        curScene: action.payload.scene,
        curSceneName: action.payload.sceneName,
      }
    }
    case DUPLICATE_SCENE: {

      return;
    }
    case CREATE_THUMBNAIL: {

      return;
    }
    default:
      return state;
  }
};

export default listScene;