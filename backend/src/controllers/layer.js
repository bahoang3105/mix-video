import db from "../models";

const Layer = db.layer;

export const getLayer = async (req, res) => {
  try {
    const liveId = req.query.liveId;
    const live = await Layer.findOne({ attributes: ['listLayer'], where: { liveId } });
    // if never save layer before
    if(!live) {
      await Layer.create({
        liveId,
        listLayer: [],
      });
      return res.status(200).json({ layers: [] });
    }
    return res.status(200).json({ layers: live.listLayer });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

export const setLayer = async (req, res, next) => {
  try {
    const liveId = req.body.liveId;
    const live = await Layer.findOne({ attributes: ['liveId'], where: { liveId }});

    // if this is the first time saving
    if(!live) {
      await Layer.create({
        liveId,
        listLayer: req.body.layers,
      });
    //else update this record
    } else {
      await Layer.update({
        listLayer: req.body.layers,
      }, {
        where: {
          liveId,
        },
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}