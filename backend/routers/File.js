import { Router } from "express";
// import multer from "multer";
import { deleteFile, getFiles, insertFile, renameFile } from "../controllers/handleFiles";
import allowIfHasSecretKey from '../controllers/allowIfHasSecretKey';

const router = Router();

// const storage = multer.memoryStorage({
//   destination: (req, file, callback) => {
//     callback(null, '');
//   }
// });
// 
// const upload = multer({storage}).single('file');

// router.post('/upload', allowIfHasSecretKey, upload, insertFile);
router.post('/upload', allowIfHasSecretKey, insertFile);
// router.get('/renewUrl', allowIfHasSecretKey, renewUrl);
router.get('/getFiles', allowIfHasSecretKey, getFiles);
router.delete('/deleteFile', allowIfHasSecretKey, deleteFile);
router.put('/renameFile', allowIfHasSecretKey, renameFile);

export default router;