import { Router } from "express";
import multer from "multer";
import { getFiles, insertFile, renewUrl } from "../controllers/handleFiles";
import allowIfHasSecretKey from '../controllers/allowIfHasSecretKey';

const router = Router();

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, '');
  }
});

const upload = multer({storage}).single('file');

router.post('/upload', allowIfHasSecretKey, upload, insertFile);
router.get('/renewUrl', allowIfHasSecretKey, renewUrl);
router.get('/getFiles', allowIfHasSecretKey, getFiles);

export default router;