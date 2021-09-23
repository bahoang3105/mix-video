export const getVideoState = store => store.listVideo;

export const getListVideo = store => 
  (getVideoState(store).videos !== null) ? getVideoState(store).videos : [];

export const getLayerState = store => store.listLayer;

export const getListLayer = store => 
  (getLayerState(store).layers !== null) ? getLayerState(store).layers : [];
    
export const getSceneState = store => store.listScene;

export const getListScene = store => 
  (getSceneState(store).scenes !== null) ? getSceneState(store).scenes : [];
      