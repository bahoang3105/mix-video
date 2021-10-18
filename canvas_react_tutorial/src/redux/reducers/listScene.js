import {
  ADD_SCENE,
  GET_SCENES,
  DEL_SCENE,
  DUPLICATE_SCENE,
  CREATE_THUMBNAIL,
  CHANGE_CUR_SCENE,
  CHANGE_NAME_SCENE,
  CHANGE_STATE_SCENES,
  CHANGE_SCENE,
} from '../actionTypes';

const initialState = {
  history: [],
  historyState: 0,
  curScene: null,
  curSceneName: null,
  scenes: [],
  num: 0,
  historyType: 'normal',
}

const listScene = (state = initialState, action) => {
  const img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/1024px-Solid_black.svg.png';
  const length = state.history.length;
  switch(action.type) {
    case ADD_SCENE: {
      const newName = 'Scene ' + state.num;
      const newScene = {
        num: state.num, 
        name: newName, 
        img: img,
        blur: 0,
        brightness: 1,
        opacity: 1,
        grayscale: 0,
        saturate: 1,
        contrast: 1,
        sepia: 0,
        template: 'None',
      };
      return {
        ...state,
        scenes: [...state.scenes, newScene],
        num: state.num + 1,
        history: [
          ...state.history.slice(0, length - state.historyState),
          {
            scenes: [...state.scenes, newScene],
            num: state.num + 1,
            curScene: state.curScene,
            curSceneName: state.curSceneName,
          }
        ],
        historyState: 0,
        historyType: 'normal',
      };
    }
    case GET_SCENES: {
      if(!action.payload.scenes || action.payload.scenes.length === 0) {
        const newName = 'Scene 1';
        const newScene = {
          "name": newName, 
          "img": img, 
          "num": 1,
          blur: 0,
          brightness: 1,
          opacity: 1,
          grayscale: 0,
          saturate: 1,
          contrast: 1,
          sepia: 0,
          template: 'none',
        };
        return {
          ...state,
          scenes: [newScene],
          curScene: 1,
          curSceneName: 'Scene 1',
          num: 2,
          history: [
            {
              scenes: [newScene],
              curScene: 1,
              curSceneName: 'Scene 1',
              num: 2,
            }
          ],
          historyState: 0,
          historyType: 'normal',
        };
      }
      return {
        ...state,
        scenes: action.payload.scenes,
        curScene: action.payload.scenes[0].num,
        curSceneName: action.payload.scenes[0].name,
        num: action.payload.num,
        history: [
          {
            scenes: action.payload.scenes,
            curScene: action.payload.scenes[0].num,
            curSceneName: action.payload.scenes[0].name,
            num: action.payload.num,
          }
        ],
        historyState: 0,
        historyType: 'normal',
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
        history: [
          ...state.history.slice(0, length - state.historyState),
          {
            scenes: [
              ...state.scenes.slice(0, place),
              ...state.scenes.slice(place+1)
            ],
            curScene: curScene,
            curSceneName: curSceneName,
            num: state.num,
          }
        ],
        historyState: 0,
        historyType: 'normal',
      };
    }
    case CHANGE_CUR_SCENE: {
      return {
        ...state,
        curScene: action.payload.scene,
        curSceneName: action.payload.sceneName,
        history: [
          ...state.history.slice(0, length - state.historyState),
          {
            curScene: action.payload.scene,
            curSceneName: action.payload.sceneName,
            scenes: state.scenes,
            num: state.num,
          },
          ...state.history.slice(length - state.historyState),
        ],
        historyType: 'normal',
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
        history: [
          ...state.history.slice(0, length - state.historyState),
          {
            scenes: [
              ...state.scenes.slice(0, place),
              {
                ...state.scenes[place],
                name: action.payload.newName
              },
              ...state.scenes.slice(place+1)
            ],
            curSceneName: curSceneName,
            curScene: state.curScene,
            num: state.num,
          }
        ],
        historyState: 0,
        historyType: 'normal',
      }
    }
    case CHANGE_SCENE: {
      const place = state.scenes.findIndex(Scene => Scene.num === action.payload.num);
      if(action.payload.type !== state.historyType) {
        return {
          ...state,
          scenes: [
            ...state.scenes.slice(0, place),
            action.payload.scene,
            ...state.scenes.slice(place+1),
          ],
          history: [
            ...state.history.slice(0, length - state.historyState),
            {
              scenes: [
                ...state.scenes.slice(0, place),
                action.payload.scene,
                ...state.scenes.slice(place+1),
              ],
              curSceneName: state.curSceneName,
              curScene: state.curScene,
              num: state.num,
            }
          ],
          historyState: 0,
          historyType: !action.payload.type ? 'normal' : action.payload.type,
        }
      }
      return {
        ...state,
        scenes: [
          ...state.scenes.slice(0, place),
          action.payload.scene,
          ...state.scenes.slice(place+1),
        ],
        history: [
          ...state.history.slice(0, length - state.historyState - 1),
          {
            scenes: [
              ...state.scenes.slice(0, place),
              action.payload.scene,
              ...state.scenes.slice(place+1),
            ],
            curScene: state.curScene,
            curSceneName: state.curSceneName,
            num: state.num,
          }
        ],
        historyState: 0,
        historyType: !action.payload.type ? 'normal' : action.payload.type,
      }
    }
    case DUPLICATE_SCENE: {
      const place = state.scenes.findIndex(scene => scene.num === action.payload.scene);
      return {
        ...state,
        scenes: [
          ...state.scenes.slice(0, place+1),
          {
            ...state.scenes[place],
            num: state.num,
            name: state.scenes[place].name + ' (Copy)',
          },
          ...state.scenes.slice(place+1),
        ],
        num: state.num + 1,
        history: [
          ...state.history.slice(0, length - state.historyState),
          {
            scenes: [
              ...state.scenes.slice(0, place+1),
              {
                ...state.scenes[place],
                num: state.num,
                name: state.scenes[place].name + ' (Copy)',
              },
              ...state.scenes.slice(place+1),
            ],
            num: state.num + 1,
            curScene: state.curScene,
            curSceneName: state.curSceneName,
          },
        ],
        historyState: 0,
        historyType: 'normal',
      }
    }
    case CREATE_THUMBNAIL: {
      const place = state.scenes.findIndex(scene => scene.num === action.payload.scene);
      return {
        ...state,
        scenes: [
          ...state.scenes.slice(0, place),
          {
            ...state.scenes[place],
            img: action.payload.img,
          },
          ...state.scenes.slice(place+1),
        ],
        history: [
          ...state.history.slice(0, length - state.historyState),
          {
            scenes: [
              ...state.scenes.slice(0, place),
              {
                ...state.scenes[place],
                img: action.payload.img,
              },
              ...state.scenes.slice(place+1),
            ],
            curScene: state.curScene,
            curSceneName: state.curSceneName,
            num: state.num,
          },
        ],
        historyState: 0,
        historyType: 'normal',
      }
    }
    case CHANGE_STATE_SCENES: {
      const numState = action.payload.num;
      const { scenes, curScene, curSceneName, num } = state.history[length - numState - 1];
      return {
        ...state,
        curScene: curScene,
        curSceneName: curSceneName,
        num: num,
        scenes: scenes,
        historyState: numState,
      } 
    }
    default:
      return state;
  }
};

export default listScene;