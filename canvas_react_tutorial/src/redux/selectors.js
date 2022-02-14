export const getVideoState = store => store.listVideo;

export const getListVideo = store => getVideoState(store).videos;

export const getLayerState = store => store.listLayer;

export const getListLayer = store => getLayerState(store).layers;

export const getCurLayer = store => getLayerState(store).curLayer;

export const getNumLayer = store => getLayerState(store).num;

export const getSceneState = store => store.listScene;

export const getListScene = store => getSceneState(store).scenes;

export const getCurScene = store => getSceneState(store).curScene;

export const getCurSceneName = store => getSceneState(store).curSceneName;

export const getNumScene = store => getSceneState(store).num;

export const getHistoryState = store => store.listHistory;

export const getListHistory = store => getHistoryState(store).history;

export const getNumHistory = store => getHistoryState(store).num;

export const getLayerHistory = store => getHistoryState(store).layer;

export const getSceneHistory = store => getHistoryState(store).scene;
      