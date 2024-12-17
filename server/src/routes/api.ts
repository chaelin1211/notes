import express from 'express';
import {getYarn, getYarns, saveYarn} from "../controllers/yarnController.js";

const router = express.Router();

const YARN_PATH = '/yarn';
router.get(YARN_PATH, getYarn);
router.get(YARN_PATH+'/list', getYarns);
router.post(YARN_PATH, saveYarn);

export default router;