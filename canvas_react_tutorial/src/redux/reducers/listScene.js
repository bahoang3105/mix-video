import {
  ADD_SCENE,
  GET_SCENES,
  DEL_SCENE,
  DUPLICATE_SCENE,
  CREATE_THUMBNAIL,
  CHANGE_CUR_SCENE,
  CHANGE_NAME_SCENE,
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
      const newScene = {"num": state.num, "name": newName, "img": img};
      return {
        ...state,
        scenes: [...state.scenes, newScene],
        num: state.num + 1,
        curScene: state.curScene,
        curSceneName: state.curSceneName,
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
      const place = state.scenes.findIndex(Scene => Scene.num === scene);
      const curScene = (state.curScene === state.scenes[place].num) ? ((place === 0) ? state.scenes[1].num : state.scenes[0].num) : state.curScene;
      const curSceneName = state.scenes.find(Scene => Scene.num === curScene).name;
      
      return {
        ...state,
        scenes: [
          ...state.scenes.slice(0, place),
          ...state.scenes.slice(place+1)
        ],
        curScene: curScene,
        curSceneName: curSceneName,
      };
    }
    case CHANGE_CUR_SCENE: {
      return {
        ...state,
        curScene: action.payload.scene,
        curSceneName: action.payload.sceneName,
      }
    }
    case CHANGE_NAME_SCENE: {
      const place = state.scenes.findIndex(Scene => Scene.num === action.payload.scene);
      const curSceneName = (state.curScene === action.payload.scene) ? action.payload.newName : state.curSceneName;
      return {
        ...state,
        scenes: [
          ...state.scenes.slice(0, place),
          {
            ...state.scenes[place],
            name: action.payload.newName
          },
          ...state.scenes.slice(place+1)
        ],
        curSceneName: curSceneName,
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