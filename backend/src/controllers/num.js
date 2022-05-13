import db from "../models"

const Num = db.num;

export const getLayerNum = async (req, res) => {
  try {
    const live = await Num.findOne({ attributes: ['layerNum'], where: { liveId: req.query.liveId } });
    // if never save layer before
    if(!live) {
      await Num.create({
        liveId: req.query.liveId,
        layerNum: 1,
        sceneNum: 1,
      });
      return res.status(200).json({ layerNum: 1 });
    }
    return res.status(200).json({ layerNum: live.layerNum });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

export const getSceneNum = async (req, res) => {
  try {
    const live = await Num.findOne({ attributes: ['sceneNum'], where: { liveId: req.query.liveId } });
    // if never save layer before
    if(!live) {
      await Num.create({
        liveId: req.query.liveId,
        layerNum: 1,
        sceneNum: 1,
      });
      return res.status(200).json({ sceneNum: 1 });
    }
    return res.status(200).json({ sceneNum: live.sceneNum });
  } catch (err) {
    res.status(400).json({ message: err + '' });
  }
}

export const setNum = async (req, res) => {
  try {
    const live = await Num.findOne({ where: { liveId: req.body.liveId }});

    // if this is the first time saving
    if(!live) {
      await Num.create({
        liveId: req.body.liveId,
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
          liveId: req.body.liveId,
        },
      });
    }
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}