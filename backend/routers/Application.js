import { Router } from 'express';
import allowIfHasSecretKey from '../controllers/allowIfHasSecretKey';
import { createApp, getNameStream, updateName, verifyKey } from '../controllers/handleApps';
import { getLayer, setLayer } from '../controllers/handleLayers';
import { getLayerNum, getSceneNum, setNum } from '../controllers/handleNums';
import { getScene, setScene } from '../controllers/handleScenes';

const router = Router();

router.post('/create', createApp);
router.get('/verifyKey', allowIfHasSecretKey, verifyKey);
router.get('/getLayer', allowIfHasSecretKey, getLayer);
router.get('/getLayerNum', allowIfHasSecretKey, getLayerNum);
router.get('/getScene', allowIfHasSecretKey, getScene);
router.get('/getSceneNum', allowIfHasSecretKey, getSceneNum);
router.put('/save', allowIfHasSecretKey, setLayer, setScene, setNum);
router.get('/getNameStream', allowIfHasSecretKey, getNameStream);
router.post('/updateName', allowIfHasSecretKey, updateName);

export default router;