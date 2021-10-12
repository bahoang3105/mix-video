import { combineReducers } from "redux";
import listLayer from "./listLayer";
import listScene from "./listScene";
import listVideo from "./listVideo";
import listHistory from "./listHistory";

export default combineReducers({ listLayer, listScene, listVideo, listHistory });