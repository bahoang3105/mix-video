import db from "../models";

const Layer = db.layer;

export const getLayer = async (req, res) => {
  try {
    const app = await Layer.findOne({ attributes: ['listLayer'], where: { appId: req.app.id } });
    // if never save layer before
    if(!app) {
      await Layer.create({
        appId: req.app.id,
        listLayer: [],
      });
      return res.status(200).json({ layers: [] });
    }
    return res.status(200).json({ layers: app.listLayer });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

export const setLayer = async (req, res, next) => {
  try {
    const app = await Layer.findOne({ attributes: ['appId'], where: { appId: req.app.id }});

    // if this is the first time saving
    if(!app) {
      await Layer.create({
        appId: req.app.id,
        listLayer: req.body.layers,
      });
    //else update this record
    } else {
      await Layer.update({
        listLayer: req.body.layers,
      }, {
        where: {
          appId: req.app.id,
        },
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}