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
            w: 100,
            h: 100,
            background: 'none',
            text: 'Some text',
            transparency: '100',
            fontFamily: 'Courier New',
            fontSize: 20,
            fontStyle: 'none',
            fontColor: '#fff',
            animation: 'none',
            direction: 'left',
            speed: '0.5',
            dropShadow: 'none',
            shadowColor: '#000',
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
                x: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              x: action.payload.value
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
                y: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              y: action.payload.value
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
                g: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              g: action.payload.value
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
                w: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              w: action.payload.value
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
                h: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              h: action.payload.value
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
                transparency: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              transparency: action.payload.value
            }
          }
        }
        case 'background': {
          console.log(action.payload.value)
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
        default:
          return state;
      }
    }
    case CHANGE_CUR_LAYER: {
      const curLayer = state.layers.find(Layer => Layer.num === action.payload.layer);
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