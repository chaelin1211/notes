import express from 'express';
import {getYarn, setYarns} from "../controllers/yarnController.js";

const router = express.Router();

const YARN_PATH = '/yarn';
router.get(YARN_PATH, getYarn);
router.post(YARN_PATH, setYarns);

export default router;