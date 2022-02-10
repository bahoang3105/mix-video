import {
  ADD_LAYER,
  DEL_LAYER,
  DEL_VIDEO_LAYER,
  DUPLICATE_LAYER,
  DUPLICATE_SCENE,
  GET_LAYERS,
  CHANGE_LAYER,
  CHANGE_NAME_LAYER,
  CHANGE_CUR_LAYER,
  MOVE_LAYER,
  ZOOMIN_LAYER,
  ZOOMOUT_LAYER,
  DEL_SCENE,
  SWITCH_STATE_VIDEO,
  CHANGE_STATE_LAYERS,
  ADD_STREAM,
  // RENEW_URL,
} from '../actionTypes';

const initialState = {
  history: [],
  historyState: 0,
  historyType: 'normal',
  layers: null,
  num: 1,
  curLayer: [],
};

const listLayer = (state = initialState, action) => {
  const length = state.history.length;
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
          const {name, link, width, height} = action.payload.details;
          newLayer = {
            name: name ? name : 'Image' + state.num,
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
        case 'imageUpload': {
          const {name, link, width, height, fileKey, date} = action.payload.details;
          newLayer = {
            name: name,
            type: 'imageUpload',
            fileKey,
            scene: action.payload.curScene,
            num: state.num,
            x: 0,
            y: 0,
            g: 0,
            date,
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
          const { name, src, height, width } = action.payload.details;
          newLayer = {
            name: name,
            type: 'camera',
            scene: action.payload.curScene,
            num: state.num,
            x: 0,
            y: 0,
            g: 0,
            width: width,
            height: height,
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
          const { name, src, width, height, onCamera } = action.payload.details;
          newLayer = {
            name: name + state.num,
            type: 'screen',
            scene: action.payload.curScene,
            num: state.num,
            x: 0,
            y: 0,
            g: 0,
            width: width,
            height: height,
            opacity: 1,
            src: src,
            camera: onCamera ? onCamera : true,
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
            width: 560,
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
        case 'video': {
          const {name, link, width, height, fileKey, date} = action.payload.details;
          newLayer = {
            name: name,
            type: 'video',
            scene: action.payload.curScene,
            num: state.num,
            x: 0,
            y: 0,
            g: 0,
            width: width,
            height: height,
            opacity: 1,
            src: link,
            hidden: false,
            lock: false,
            autoplay: false,
            mute: false,
            start: false,
            pause: true,
            loop: false,
            volume: 100,
            fileKey,
            date,
          }
          break;
        }
        case 'audio': {
          const {name, link, fileKey, date} = action.payload.details;
          newLayer = {
            name: name,
            type: 'audio',
            scene: action.payload.curScene,
            num: state.num,
            x: 0,
            y: 0,
            g: 0,
            fileKey,
            date,
            width: 50,
            height: 50,
            opacity: 1,
            src: link,
            hidden: false,
            lock: false,
            mute: false,
            autoplay: false,
            start: false,
            pause: true,
            loop: false,
            volume: 100,
          }
          break;
        }
        case 'micro': {
          const {name, src} = action.payload.details;
          newLayer = {
            name: name + state.num,
            type: 'micro',
            scene: action.payload.curScene,
            num: state.num,
            x: 0,
            y: 0,
            g: 0,
            width: 50,
            height: 50,
            opacity: 1,
            src: src,
            hidden: false,
            lock: false,
            mute: false,
            volume: 100,
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
            ...state.history.slice(0, length - state.historyState),
            {
              layers: [newLayer],
              num: 2,
              curLayer: curLayer,
            },
          ],
          historyState: 0,
          historyType: 'normal'
        }
      }
      return {
        ...state,
        layers: [...state.layers, newLayer],
        num: state.num + 1,
        history: [
          ...state.history.slice(0, length - state.historyState),
          {
            layers: [...state.layers, newLayer],
            num: state.num + 1,
            curLayer: state.curLayer,
          },
        ],
        historyState: 0,
        historyType: 'normal',
      };
    }
    case ADD_STREAM: {
      const { link } = action.payload.details;
      const newLayer = {
        name: 'rtmp ' + state.num,
        type: 'rtmp',
        scene: action.payload.curScene,
        num: state.num,
        x: 0,
        y: 0,
        g: 0,
        width: 1000,
        height: 600,
        opacity: 1,
        src: link,
        hidden: false,
        lock: false,
        mute: false,
        volume: 100,
      }
      return {
        ...state,
        layers: [...state.layers, newLayer],
        num: state.num + 1,
        history: [
          ...state.history.slice(0, length - state.historyState),
          {
            layers: [...state.layers, newLayer],
            num: state.num + 1,
            curLayer: state.curLayer,
          },
        ],
        historyState: 0,
        historyType: 'normal',
      };
    }
    // case RENEW_URL: {
    //   const { fileKey, url } = action.payload;
    //   return {
    //     ...state,
    //     layers: state.layers ? state.layers.map(layer => (layer.fileKey === fileKey ? { ...layer, url } : layer)) : state.layers,
    //   }
    // }
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
          ...state.history.slice(0, length - state.historyState),
          {
            layers: [
              ...state.layers.slice(0, place),
              ...state.layers.slice(place+1)
            ],
            num: state.num,
            curLayer: curLayer,
          },
        ],
        historyState: 0,
        historyType: 'normal',
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
          ...state.history.slice(0, length - state.historyState),
          {
            layers: layers,
            num: state.num,
            curLayer: curLayer,
          },
        ],
        historyState: 0,
        historyType: 'normal',
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
          ...state.history.slice(0, length - state.historyState),
          {
            layers: [...state.layers, dupLayer],
            num: state.num + 1,
            curLayer: state.curLayer,
          },
        ],
        historyState: 0,
        historyType: 'normal',
      }
    }
    case DUPLICATE_SCENE: {
      const layersInScene = state.layers.filter(layer => layer.scene === action.payload.scene);
      const mapLayers = layersInScene.map((layer, i) => layer = {...layer, num: state.num + i, scene: action.payload.numScene});
      return {
        ...state,
        num: state.num + mapLayers.length,
        layers: [
          ...state.layers,
          ...mapLayers,
        ],
        history: [
          ...state.history.slice(0, length - state.historyState),
          {
            num: state.num + mapLayers.length,
            layers: [
              ...state.layers,
              ...mapLayers,
            ],
            curLayer: state.curLayer,
          },
        ],
        historyState: 0,
      }
    }
    case GET_LAYERS: {
      return {
        ...state,
        layers: action.payload.layers,
        num: action.payload.num,
        history: action.payload.history,
      };
    }
    case CHANGE_LAYER: {
      const place = state.layers.findIndex(Layer => Layer.num === action.payload.num);
      if(action.payload.type !== state.historyType) {
        return {
          ...state,
          layers: [
            ...state.layers.slice(0, place),
            action.payload.layer,
            ...state.layers.slice(place+1)
          ],
          curLayer: action.payload.layer,
          history: [
            ...state.history.slice(0, length - state.historyState),
            {
              layers: [
                ...state.layers.slice(0, place),
                action.payload.layer,
                ...state.layers.slice(place+1)
              ],
              curLayer: action.payload.layer,
              num: state.num,
            },
          ],
          historyState: 0,
          historyType: !action.payload.type ? 'normal' : action.payload.type, 
        }
      }
      return {
        ...state,
        layers: [
          ...state.layers.slice(0, place),
          action.payload.layer,
          ...state.layers.slice(place+1)
        ],
        curLayer: action.payload.layer,
        history: [
          ...state.history.slice(0, length - state.historyState - 1),
          {
            layers: [
              ...state.layers.slice(0, place),
              action.payload.layer,
              ...state.layers.slice(place+1)
            ],
            curLayer: action.payload.layer,
            num: state.num,
          },
        ],
        historyState: 0,
        historyType: !action.payload.type ? 'normal' : action.payload.type, 
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
          ...state.history.slice(0, length - state.historyState),
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
            num: state.num,
          },
        ],
        historyState: 0,
        historyType: 'normal',
      }
    }
    case MOVE_LAYER: {
      const { sourceNum, destinationNum } = action.payload;
      const sourcePlace = state.layers.findIndex(layer => layer.num === sourceNum);
      const destinationPlace = state.layers.findIndex(layer => layer.num === destinationNum);
      if(sourcePlace < destinationPlace) {
        return {
          ...state,
          layers: [
            ...state.layers.slice(0, sourcePlace),
            ...state.layers.slice(sourcePlace+1, destinationPlace+1),
            state.layers[sourcePlace],
            ...state.layers.slice(destinationPlace+1),
          ],
          history: [
            ...state.history.slice(0, length - state.historyState),
            {
              layers: [
                ...state.layers.slice(0, sourcePlace),
                ...state.layers.slice(sourcePlace+1, destinationPlace+1),
                state.layers[sourcePlace],
                ...state.layers.slice(destinationPlace+1),
              ],
              curLayer: state.curLayer,
              num: state.num,
            },
          ],
          historyState: 0,
          historyType: 'normal',
        }
      }
      return {
        ...state,
        layers: [
          ...state.layers.slice(0, destinationPlace),
          state.layers[sourcePlace],
          ...state.layers.slice(destinationPlace, sourcePlace),
          ...state.layers.slice(sourcePlace+1),
        ],
        history: [
          ...state.history.slice(0, length - state.historyState),
          {
            layers: [
              ...state.layers.slice(0, destinationPlace),
              state.layers[sourcePlace],
              ...state.layers.slice(destinationPlace, sourcePlace),
              ...state.layers.slice(sourcePlace+1),
            ],
            curLayer: state.curLayer,
            num: state.num,
          },
        ],
        historyState: 0,
        historyType: 'normal',
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
        history: [
          ...state.history.slice(0, length - state.historyState),
          {
            layers: state.layers.filter(layer => layer.scene !== action.payload.scene),
            curLayer: (state.curLayer === []) ? [] : ((state.curLayer.scene === action.payload.scene) ? [] : state.curLayer),
            num: state.num
          },
        ],
        historyState: 0,
        historyType: 'normal',
      }
    }
    case SWITCH_STATE_VIDEO: {
      const src = action.payload.src;
      return {
        ...state,
        layers: state.layers.map(
          layer => ((layer.type === 'camera' || layer.type === 'screen') && layer.src === src) ?  {...layer, camera: !layer.camera} : layer),
        history: [
          ...state.history.slice(0, length - state.historyState),
          {
            layers: state.layers.map(
              layer => ((layer.type === 'camera' || layer.type === 'screen') && layer.src === src) ?  {...layer, camera: !layer.camera} : layer),
            curLayer: state.curLayer,
            num: state.num,
          },
        ],
        historyState: 0,
        historyType: 'normal',
      }
    }
    case CHANGE_STATE_LAYERS: {
      const numState = action.payload.num;
      const { curLayer, layers, num } = state.history[length - numState - 1];
      return {
        ...state,
        curLayer: curLayer,
        layers: layers,
        num: num,
        historyState: numState,
      }
    }
    default:
      return state;
  }
};

export default listLayer;