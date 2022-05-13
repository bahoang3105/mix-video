"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.updateName=exports.getNameStream=void 0;var _models=_interopRequireDefault(require("../models"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const Live=_models.default.live;const getNameStream=async(req,res)=>{try{const live=await Live.findOne({attributes:["nameStream"],where:{id:req.query.liveId}});if(!live){await Live.create({id:req.query.liveId});return res.status(200).json({name:"Stream 1",id:req.query.liveId})}return res.status(200).json({name:live.nameStream})}catch(err){return res.status(404).json({message:err+" "})}};exports.getNameStream=getNameStream;const updateName=async(req,res)=>{try{await Live.update({nameStream:req.body.newName},{where:{id:req.body.liveId}});return res.status(200).json({success:true})}catch(err){return res.status(401).json({message:err+" "})}};exports.updateName=updateName;