import 'dotenv/config';
import db from '../models';

const File = db.file;

export const insertFile = async (req, res) => {
  try {
    // get file details
    const { fileName, fileType, fileKey, url, liveId } = req.body;
    const newFile = {
        liveId,
        fileType,
        fileKey,
        fileName,
        url,
        date: new Date(),
    };

    await File.create(newFile);

    return res.status(201).json({ success: true })
  } catch(error) {
    return res.status(400).json({ success: false, message: error + ' ' });
  };
};

export const getFiles = async (req, res) => {
  try {
    const listFile = await File.findAll({ where: { liveId: req.query.liveId }, order: [['date', 'DESC']] });
    return res.status(200).json({ files: listFile });
  } catch (err) {
    return res.status(404).json({ message: err + ' ' });
  }
}

export const deleteFile = async (req, res) => {
  try {
    await File.destroy({
      where: {
        fileKey: req.body.fileKey
      }
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(404).json({ message: err + ' ' });
  }
}

export const renameFile = async (req, res) => {
  try {
    await File.update({
      fileName: req.body.fileName,  
    }, {
      where: {
        fileKey: req.body.fileKey,
      }
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(404).json({ message: err + ' ' });
  }
}
