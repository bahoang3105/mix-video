"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.setLayer=exports.getLayer=void 0;var _models=_interopRequireDefault(require("../models"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const Layer=_models.default.layer;const getLayer=async(req,res)=>{try{const liveId=req.query.liveId;const live=await Layer.findOne({attributes:["listLayer"],where:{liveId}});if(!live){await Layer.create({liveId,listLayer:[]});return res.status(200).json({layers:[]})}return res.status(200).json({layers:live.listLayer})}catch(err){res.status(400).json({message:err})}};exports.getLayer=getLayer;const setLayer=async(req,res,next)=>{try{const liveId=req.body.liveId;const live=await Layer.findOne({attributes:["liveId"],where:{liveId}});if(!live){await Layer.create({liveId,listLayer:req.body.layers})}else{await Layer.update({listLayer:req.body.layers},{where:{liveId}})}next()}catch(err){next(err)}};exports.setLayer=setLayer;