import express, {Express} from 'express';

import {getMovies} from "./controller/sample.js";

const app: Express = express();
const port = 8080;

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

app.get('/db-connect', async (req, res) => {
  await getMovies(req, res);
});


export default app;
