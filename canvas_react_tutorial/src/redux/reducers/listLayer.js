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
  DEL_SCENE,
  SWITCH_STATE_VIDEO,
} from '../actionTypes';

const initialState = {
  history: [],
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
            background: null,
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
            hidden: false,
            lock: false,
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
            hidden: false,
            lock: false,
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
            hidden: false,
            lock: false,
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
            hidden: false,
            lock: false,
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
            hidden: false,
            lock: false,
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
            camera: true,
            micro: true,
            hidden: false,
            lock: false,
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
            width: 560,
            height: 315,
            opacity: 1,
            src: src,
            camera: true,
            micro: true,
            hidden: false,
            lock: false,
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
            autoplay: false,
            loop: false,
            width: 540,
            height: 315,
            opacity: 1,
            src: src,
            start: false,
            pause: true,
            mute: false,
            volume: 100,
            hidden: false,
            lock: false,
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
          history: [
            ...state.history,
            {
              layers: [newLayer],
              num: 2,
              curLayer: curLayer,
            },
          ]
        }
      }
      return {
        ...state,
        layers: [...state.layers, newLayer],
        num: state.num + 1,
        history: [
          ...state.history,
          {
            layers: [...state.layers, newLayer],
            num: state.num + 1,
            curLayer: state.curLayer,
          },
        ]
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
        history: [
          ...state.history,
          {
            layers: [
              ...state.layers.slice(0, place),
              ...state.layers.slice(place+1)
            ],
            num: state.num,
            curLayer: curLayer,
          },
        ]
      }
    }
    case DEL_VIDEO_LAYER: {
      const src = action.payload.videoSrc;
      const layers = (state.layers !== null) ? state.layers.filter(layer => ((layer.type !== 'camera' && layer.type !== 'screen') || layer.src !== src)) : [];
      const place = layers.findIndex(layer => layer.num === state.curLayer.num);
      const curLayer = place >= 0 ? layers[place] : [];
      return {
        ...state,
        layers: layers,
        curLayer: curLayer,
        history: [
          ...state.history,
          {
            layers: layers,
            num: state.num,
            curLayer: curLayer,
          },
        ],
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
        history: [
          ...state.history,
          {
            layers: [...state.layers, dupLayer],
            num: state.num + 1,
            curLayer: state.curLayer,
          },
        ]
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
      const place = state.layers.findIndex(Layer => Layer.num === action.payload.num);
      return {
        ...state,
        layers: [
          ...state.layers.slice(0, place),
          action.payload.layer,
          ...state.layers.slice(place+1)
        ],
        curLayer: action.payload.layer,
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
        },
        history: [
          ...state.history,
          {
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
            },
          },
        ]
      }
    }
    case ZOOMIN_LAYER: {

      return;
    }
    case ZOOMOUT_LAYER: {

      return;
    }
    case DEL_SCENE: {
      return {
        ...state,
        layers: state.layers.filter(layer => layer.scene !== action.payload.scene),
        curLayer: (state.curLayer === []) ? [] : ((state.curLayer.scene === action.payload.scene) ? [] : state.curLayer), 
      }
    }
    case SWITCH_STATE_VIDEO: {
      const src = action.payload.src;
      return {
        ...state,
        layers: state.layers.map(
          layer => ((layer.type === 'camera' || layer.type === 'screen') && layer.src === src) ?  {...layer, camera: !layer.camera} : layer),
      }
    }
    default:
      return state;
  }
};

export default listLayer;