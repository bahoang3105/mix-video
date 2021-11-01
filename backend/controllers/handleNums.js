import db from "../models"

const Num = db.num;

export const getLayerNum = async (req, res) => {
  try {
    const app = await Num.findOne({ attributes: ['layerNum'], where: { appId: req.app.id } });
    // if never save layer before
    if(!app) {
      await Num.create({
        appId: req.app.id,
        layerNum: 1,
        sceneNum: 1,
      });
      return res.status(200).json({ layerNum: 1 });
    }
    return res.status(200).json({ layerNum: app.layerNum });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

export const getSceneNum = async (req, res) => {
  try {
    const app = await Num.findOne({ attributes: ['sceneNum'], where: { appId: req.app.id } });
    // if never save layer before
    if(!app) {
      await Num.create({
        appId: req.app.id,
        layerNum: 1,
        sceneNum: 1,
      });
      return res.status(200).json({ sceneNum: 1 });
    }
    return res.status(200).json({ sceneNum: app.sceneNum });
  } catch (err) {
    res.status(400).json({ message: err + '' });
  }
}

export const setNum = async (req, res) => {
  try {
    const app = await Num.findOne({ where: { appId: req.app.id }});

    // if this is the first time saving
    if(!app) {
      await Num.create({
        appId: req.app.id,
        layerNum: req.body.numLayer,
        sceneNum: req.body.numScene,
      });
    //else update this record
    } else {
      await Num.update({
        layerNum: req.body.numLayer,
        sceneNum: req.body.numScene,
      }, {
        where: {
          appId: req.app.id,
        },
      });
    }
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}