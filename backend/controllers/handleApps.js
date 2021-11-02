import db from "../models";
import { v4 as uuid } from 'uuid';

const App = db.application;

export const createApp = async (req, res) => {
  try {
    // create Secret Key 
    const secretKey = uuid();

    // save to db
    await App.create({ secretKey });
    return res.status(201).json({ success: true, secretKey });
  } catch (err) {
    return res.status(400).json({ message: err + ' '});
  }
}

export const verifyKey = async (req, res) => {
  if(req.app) {
    return res.status(200).json({ success: true });
  }
  return res.status(404).json({ success: false, message: 'Something wrongs, please report to admin'});
}

export const getNameStream = async (req, res) => {
  try {
    const app = await App.findOne({
      attributes: ['nameStream'], 
      where: {
        id: req.app.id,
      }
    });
    return res.status(200).json({ name: app.nameStream });
  } catch (err) {
    return res.status(404).json({ message: err + ' ' });
  }
}

export const updateName = async (req, res) => {
  try {
    await App.update({ nameStream: req.body.newName }, {
      where: {
        id: req.app.id,
      }
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ message: err + ' ' });
  }
}
