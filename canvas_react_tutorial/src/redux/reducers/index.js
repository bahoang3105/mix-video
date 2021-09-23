import { combineReducers } from "redux";
import listLayer from "./listLayer";
import listScene from "./listScene";
import listVideo from "./listVideo";

export default combineReducers({ listLayer, listScene, listVideo });