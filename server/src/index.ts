import express, {Express} from 'express';
import apiRouter from './routes/api.js'
import {closeDatabaseConnection} from "./configurations/db_connection.js";


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

// 애플리케이션 종료 시 MongoDB 연결 닫기
process.on("SIGINT", async () => {
  await closeDatabaseConnection();
  process.exit(0);
});
export default app;
