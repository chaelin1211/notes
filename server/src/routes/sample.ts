import express from 'express';
const router = express.Router();
import {getMovies, setMovie} from "../controllers/sampleController.js";

router.get('/', getMovies);

router.post('/', setMovie);

export default router;