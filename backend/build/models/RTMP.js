"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;const RTMP=(sequelize,Sequelize)=>{const Rtmp=sequelize.define("rtmp",{id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},room:{type:Sequelize.STRING},name:{type:Sequelize.STRING}},{freezeTableName:true,timestamps:false,tableName:"livestream",indexes:[{name:"rtmp_index",using:"HASH",fields:["room","name"]}]});return Rtmp};var _default=RTMP;exports.default=_default;