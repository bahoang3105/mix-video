import {
  ADD_LAYER,
  DEL_LAYER,
  DUPLICATE_LAYER,
  GET_LAYERS,
  LOCK_LAYER,
  HIDE_LAYER,
  CHANGE_LAYER,
  CHANGE_CUR_LAYER,
  ZOOMIN_LAYER,
  ZOOMOUT_LAYER,
  ADD_TO_SCENE,
} from '../actionTypes';

const initialState = {
  layers: null,
  num: null,
  curLayer: [],
};

const listLayer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_LAYER: {
      let newLayer;
      switch(action.payload.type) {
        case 'text': {
          newLayer = {
            name: "Text " + state.num,
            type: action.payload.type,
            scene: action.payload.curScene,
            num: state.num,
            x: 0,
            y: 0,
            g: 0,
            width: 100,
            height: 100,
            textAlign: 'left',
            background: 'none',
            text: 'Some text',
            opacity: '100',
            fontFamily: 'Arial',
            fontSize: 20,
            fontStyle: 'none',
            fontColor: '#ffffff',
            animation: 'none',
            direction: 'left',
            speed: '0.5',
            dropShadow: 'none',
            shadowColor: '#000',
          }
          break;
        }
        case 'rectangle': {
          newLayer = {
            name: 'Rectangle ' + state.num,
            type: 'rectangle',
            scene: action.payload.curScene,
            num: state.num,
            x: 0,
            y: 0,
            g: 0,
            width: 100,
            height: 100,
            fill: '#ffffff',
            cornerRadius: 0,
            opacity: 1,
          }
          break;
        }
        case 'circle': {
          newLayer = {
            name: 'Circle ' + state.num,
            type: 'circle',
            scene: action.payload.curScene,
            num: state.num,
            x: 50,
            y: 50,
            g: 0,
            width: 100,
            height: 100,
            fill: '#ffffff',
            opacity: 1,
          }
          break;
        }
        case 'triangle': {
          newLayer = {
            name: 'Triangle ' + state.num,
            type: 'triangle',
            scene: action.payload.curScene,
            num: state.num,
            sides: 3,
            x: 0,
            y: 0,
            g: 0,
            width: 100,
            height: 100,
            fill: '#ffffff',
            opacity: 1,
          }
          break;
        }
        default:
          newLayer = {}
      }
      const curLayer = (state.curLayer.length === 0) ? newLayer : state.curLayer;
      if(!state.layers) {
        return {
          ...state,
          layers: [newLayer],
          num: 2,
          curLayer: curLayer,
        }
      }
      return {
        ...state,
        layers: [...state.layers, newLayer],
        num: state.num + 1,
      };
    }
    case ADD_TO_SCENE: {

      return;
    }
    case DEL_LAYER: {
      const { layer } = action.payload;
      const place = state.layers.findIndex(Layer => Layer.num === parseInt(layer));
      const curLayer = (state.curLayer.length === 0) ? [] : (state.curLayer.num === state.layers[place].num) ? [] : state.curLayer;
      return {
        ...state,
        layers: [
          ...state.layers.slice(0, place),
          ...state.layers.slice(place+1)
        ],
        curLayer: curLayer,
      }
    }
    case DUPLICATE_LAYER: {
      const layer = state.layers.find(Layer => Layer.num === action.payload.layer);
      const {name, num, ...dupLayer} = layer;
      const newName = name + ' (Copy)';
      const newNum = state.num;
      dupLayer.name = newName;
      dupLayer.num = newNum;
      return {
        ...state,
        layers: [...state.layers, dupLayer],
        num: state.num + 1,
      }
    }
    case GET_LAYERS: {
      return {
        ...state,
        layers: action.payload.layers,
        num: action.payload.num,
      };
    }
    case LOCK_LAYER: {

      return;
    }
    case HIDE_LAYER: {

      return;
    }
    case CHANGE_LAYER: {
      switch(action.payload.field) {
        case 'text': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                text: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              text: action.payload.value
            }
          }
        }
        case 'X': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                x: parseInt(action.payload.value)
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              x: parseInt(action.payload.value)
            }
          }
        }
        case 'Y': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                y: parseInt(action.payload.value)
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              y: parseInt(action.payload.value)
            }
          }
        }
        case 'G': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                g: parseInt(action.payload.value)
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              g: parseInt(action.payload.value)
            }
          }
        }
        case 'W': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                width: parseInt(action.payload.value)
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              width: parseInt(action.payload.value)
            }
          }
        }
        case 'H': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                height: parseInt(action.payload.value)
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              height: parseInt(action.payload.value)
            }
          }
        }
        case 'transparency': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                opacity: parseInt(action.payload.value) / 100
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              opacity: parseInt(action.payload.value) / 100
            }
          }
        }
        case 'background': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                background: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              background: action.payload.value
            }
          }
        }
        case 'fill': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          const value = (action.payload.value === 'none') ? '' : action.payload.value;
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                fill: value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              fill: value
            }
          }
        }
        case 'corner': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                cornerRadius: parseInt(action.payload.value)
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              cornerRadius: parseInt(action.payload.value)
            }
          }
        }
        default:
          return state;
      }
    }
    case CHANGE_CUR_LAYER: {
      const curLayer = (action.payload.layer === null) ? [] : state.layers.find(Layer => Layer.num === action.payload.layer);
      return {
        ...state,
        curLayer: curLayer,
      }
    }
    case ZOOMIN_LAYER: {

      return;
    }
    case ZOOMOUT_LAYER: {

      return;
    }
    default:
      return state;
  }
};

export default listLayer;