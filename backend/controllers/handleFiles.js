import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import 'dotenv/config';

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
    const { size, originalname } = req.file;
    const myFile = originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const fileUploaded = await uploadFile(req.file);
    const fileKey = fileUploaded.Key;
    
    const newFile = {
        fileKey,
        fileName: originalname,
    };

    return res.status(201).json({ success: true, newFile })
  } catch(error) {
    next(error);
  };
};

const downloadFromS3 = (fileKey) => {
  const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
  };
  return s3.getSignedUrl('getObject', params);
};

export const downloadFile = async (req, res, next) => {
  const { fileKey } = req.query;
  try {
      const url = await downloadFromS3(fileKey);
      
      return res.status(200).json({ url });
  } catch(error) {
      next(error);
  };
}
