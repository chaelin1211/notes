import express, {Express} from 'express';
import apiRouter from './routes/api.js'


const app: Express = express();
const port = 8080;

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

// Middleware
// body parser
app.use(express.json());
app.use(express.urlencoded({extended: true})); // 내장 queryString module 사용

// Route
app.use('/api', apiRouter);


export default app;
