import { Router } from "express";
// import multer from "multer";
import { deleteFile, getFiles, insertFile, renameFile } from "../controllers/file";
import allowIfHasSecretKey from '../controllers/allowIfHasSecretKey';

const router = Router();

router.post('/upload', allowIfHasSecretKey, insertFile);
router.get('/getFiles', allowIfHasSecretKey, getFiles);
router.delete('/deleteFile', allowIfHasSecretKey, deleteFile);
router.put('/renameFile', allowIfHasSecretKey, renameFile);

export default router;