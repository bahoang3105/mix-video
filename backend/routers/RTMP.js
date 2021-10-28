import { Router } from "express";
import { publish } from "../controllers/handleLiveStreams";

const router = Router();

router.post('/publish', publish);

export default router;
