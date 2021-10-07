import {
  ADD_LAYER,
  DEL_LAYER,
  DEL_VIDEO_LAYER,
  DUPLICATE_LAYER,
  GET_LAYERS,
  LOCK_LAYER,
  HIDE_LAYER,
  CHANGE_LAYER,
  CHANGE_NAME_LAYER,
  CHANGE_CUR_LAYER,
  ZOOMIN_LAYER,
  ZOOMOUT_LAYER,
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
            align: 'left',
            background: '',
            text: 'Some text',
            opacity: 1,
            fontFamily: 'Arial',
            fontSize: 20,
            style: [],
            textDecoration: 'none',
            fontColor: '#ffffff',
            animation: false,
            direction: 'left',
            speed: 0.5,
            dropShadow: false,
            shadowColor: '#000000',
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
            background: '#ffffff',
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
            background: '#ffffff',
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
            background: '#ffffff',
            opacity: 1,
          }
          break;
        }
        case 'image': {
          const {link, width, height} = action.payload.details;
          newLayer = {
            name: 'Image' + state.num,
            type: 'image',
            scene: action.payload.curScene,
            num: state.num,
            x: 0,
            y: 0,
            g: 0,
            width: width,
            height: height,
            opacity: 1,
            src: link,
            flip: false,
            scaleX: 1.0,
            scaleY: 1.0,
          }
          break;
        }
        case 'camera': {
          const { name, src } = action.payload.details;
          newLayer = {
            name: name,
            type: 'camera',
            scene: action.payload.curScene,
            num: state.num,
            x: 0,
            y: 0,
            g: 0,
            width: 400,
            height: 300,
            opacity: 1,
            src: src,
          }
          break;
        }
        case 'screen': {
          const { name, src } = action.payload.details;
          newLayer = {
            name: name,
            type: 'screen',
            scene: action.payload.curScene,
            num: state.num,
            x: 0,
            y: 0,
            g: 0,
            width: 540,
            height: 300,
            opacity: 1,
            src: src,
          }
          break;
        }
        case 'youtube': {
          const { name, src } = action.payload.details;
          newLayer = {
            name: name + state.num,
            type: 'youtube',
            scene: action.payload.curScene,
            num: state.num,
            x: 0,
            y: 0,
            g: 0,
            width: 540,
            height: 315,
            opacity: 1,
            src: src,
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
    case DEL_VIDEO_LAYER: {
      const src = action.payload.videoSrc;
      const layers = (state.layers !== null) ? state.layers.filter(layer => ((layer.type !== 'camera' && layer.type !== 'screen') || layer.src !== src)) : null;
      return {
        ...state,
        layers: layers,
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
          const value = (action.payload.value === 'none') ? '' : action.payload.value;
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                background: value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              background: value
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
        case 'align': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                align: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              align: action.payload.value
            }
          }
        }
        case 'fontSize': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                fontSize: parseInt(action.payload.value)
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              fontSize: parseInt(action.payload.value)
            }
          }
        }

        case 'fontStyle': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          const value = action.payload.value;
          const style = state.layers[place].style;
          const exist =  style.findIndex(s => s === value);
          const newStyle =  (exist >= 0) ? [...style.slice(0, exist), ...style.slice(exist + 1)] : [...style, value];
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                style: newStyle
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              style: newStyle
            }
          }
        }
        case 'textDecoration': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          const value = (state.layers[place].textDecoration === 'none') ? 'underline' : 'none';
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                textDecoration: value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              textDecoration: value
            }
          }
        }
        case 'fontColor': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          const value = action.payload.value;
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                fontColor: value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              fontColor: value
            }
          }
        }
        case 'fontFamily': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          const value = action.payload.value;
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                fontFamily: value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              fontFamily: value
            }
          }
        }
        case 'animation': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                animation: !state.layers[place].animation
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              animation: !state.layers[place].animation
            }
          }
        }
        case 'speed': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                speed: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              speed: action.payload.value
            }
          }
        }
        case 'dropShadow': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                dropShadow: !state.layers[place].dropShadow
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              dropShadow: !state.layers[place].dropShadow
            }
          }
        }
        case 'direction': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                direction: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              direction: action.payload.value
            }
          }
        }
        case 'shadowColor': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                shadowColor: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              shadowColor: action.payload.value
            }
          }
        }
        case 'flip': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                flip: !state.layers[place].flip
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              flip: !state.layers[place].flip
            }
          }
        }
        case 'scaleX': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                scaleX: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              scaleX: action.payload.value
            }
          }
        }
        case 'scaleY': {
          const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
          return {
            ...state,
            layers: state.layers.map(
              (layer, i) => i === place ? {
                ...layer,
                scaleY: action.payload.value
              } : layer
            ),
            curLayer: {
              ...state.curLayer,
              scaleY: action.payload.value
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
    case CHANGE_NAME_LAYER: {
      const place = state.layers.findIndex(Layer => Layer.num === action.payload.layer);
      return {
        ...state,
        layers: [
          ...state.layers.slice(0, place),
          {
            ...state.layers[place],
            name: action.payload.newName,
          },
          ...state.layers.slice(place+1),
        ],
        curLayer: {
          ...state.curLayer,
          name: action.payload.newName,
        }
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