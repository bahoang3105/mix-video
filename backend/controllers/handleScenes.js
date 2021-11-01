import db from "../models";

const Scene = db.scene;

export const getScene = async (req, res) => {
  try {
    const app = await Scene.findOne({ attributes: ['listScene'], where: { appId: req.app.id } });
    // if never save layer before
    if(!app) {
      await Scene.create({
        appId: req.app.id,
        listScene: [],
      });
      return res.status(200).json({ scenes: [] });
    }
    return res.status(200).json({ scenes: app.listScene });
  } catch (err) {
    res.status(400).json({ message: err + ' ' });
  }
}

export const setScene = async (req, res, next) => {
  try {
    const app = await Scene.findOne({ where: { appId: req.app.id }});

    // if this is the first time saving
    if(!app) {
      await Scene.create({
        appId: req.app.id,
        listScene: req.body.scenes,
      });
    //else update this record
    } else {
      await Scene.update({
        listScene: req.body.scenes,
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