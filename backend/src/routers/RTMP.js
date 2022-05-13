import { Router } from "express";
import { publish } from "../controllers/rtmp";

const router = Router();

router.post('/publish', publish);

export default router;
