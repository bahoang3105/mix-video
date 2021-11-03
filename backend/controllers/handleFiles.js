import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import 'dotenv/config';
import db from '../models';

const File = db.file;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const uploadFile = ({ originalname, buffer }) => {
  const myFile = originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuid()}.${fileType}`,
    Body: buffer,
    
  };
  return s3.upload(params).promise();
}

export const insertFile = async (req, res, next) => {
  try {
    // get file details
    const { originalname } = req.file;
    const myFile = originalname.split('.');
    const fileType = myFile[myFile.length - 1];
    const date = new Date();
    const fileUploaded = await uploadFile(req.file);
    const fileKey = fileUploaded.Key;
    const url = downloadFromS3(fileKey);
    const newFile = {
        appId: req.app.id,
        fileType,
        fileKey,
        fileName: originalname,
        date,
        url,
    };

    await File.create(newFile);

    return res.status(201).json({ success: true, newFile })
  } catch(error) {
    next(error);
  };
};

const downloadFromS3 = (fileKey) => {
  const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Expires: 86400,
      ResponseCacheControl: "no-cache",
  };
  return s3.getSignedUrl('getObject', params);
};

export const renewUrl = async (req, res) => {
  const { fileKey } = req.query;
  try {
    const url = downloadFromS3(fileKey);
    await File.update({ 
      url: url
    }, {
      where: {
        fileKey: fileKey
      }
    });
    return res.status(200).json({ url });
  } catch(error) {
      return res.status(404).json({ message: error + ' ' });
  };
}

export const getFiles = async (req, res) => {
  try {
    const listFile = await File.findAll({ where: { appId: req.app.id } });
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
