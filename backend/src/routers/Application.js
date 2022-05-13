import { Router } from 'express';
import allowIfHasSecretKey from '../controllers/allowIfHasSecretKey';
import { createApp, verifyKey } from '../controllers/app';
import { getLayer, setLayer } from '../controllers/layer';
import { getLayerNum, getSceneNum, setNum } from '../controllers/num';
import { getScene, setScene } from '../controllers/scene';
import { updateName, getNameStream } from '../controllers/live';

const router = Router();

router.post('/create', createApp);
router.get('/verifyKey', allowIfHasSecretKey, verifyKey);
router.get('/getLayer', allowIfHasSecretKey, getLayer);
router.get('/getLayerNum', allowIfHasSecretKey, getLayerNum);
router.get('/getScene', allowIfHasSecretKey, getScene);
router.get('/getSceneNum', allowIfHasSecretKey, getSceneNum);
router.post('/save', allowIfHasSecretKey, setLayer, setScene, setNum);
router.get('/getNameStream', getNameStream);
router.post('/updateName', allowIfHasSecretKey, updateName);

export default router;