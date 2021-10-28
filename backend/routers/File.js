import { Router } from "express";
import multer from "multer";
import { downloadFile, insertFile } from "../controllers/handleFiles";

const router = Router();

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, '');
  }
});

const upload = multer({storage}).single('file');

router.post('/upload', upload, insertFile);
router.get('/download', downloadFile);

export default router;