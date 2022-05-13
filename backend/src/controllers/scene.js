import db from "../models";

const Scene = db.scene;

export const getScene = async (req, res) => {
  try {
    const liveId = req.query.liveId;
    const live = await Scene.findOne({ attributes: ['listScene'], where: { liveId } });
    // if never save layer before
    if(!live) {
      await Scene.create({
        liveId,
        listScene: [],
      });
      return res.status(200).json({ scenes: [] });
    }
    return res.status(200).json({ scenes: live.listScene });
  } catch (err) {
    res.status(400).json({ message: err + ' ' });
  }
}

export const setScene = async (req, res, next) => {
  try {
    const live = await Scene.findOne({ where: { liveId: req.body.liveId }});

    // if this is the first time saving
    if(!live) {
      await Scene.create({
        liveId: req.body.liveId,
        listScene: req.body.scenes,
      });
    //else update this record
    } else {
      await Scene.update({
        listScene: req.body.scenes,
      }, {
        where: {
          liveId: req.body.liveId,
        },
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}