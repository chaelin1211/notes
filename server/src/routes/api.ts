import express from 'express';
import {deleteYarn, getYarn, getYarns, saveYarn} from "../controllers/yarnController.js";

const router = express.Router();

const YARN_PATH = '/yarn';
router.get(YARN_PATH, getYarn);
router.get(YARN_PATH+'/list', getYarns);
router.post(YARN_PATH, saveYarn);
router.delete(YARN_PATH, deleteYarn);

export default router;