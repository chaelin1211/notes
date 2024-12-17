import express, {Express} from 'express';
import apiRouter from './routes/api.js'
import {closeDatabaseConnection} from "./configurations/db_connection.js";
import {logger} from "./configurations/logger.js";


const app: Express = express();
const port = 8080;

app.listen(port, () => {
  logger.info(`[server]: Server is running at https://localhost:${port}`);
});

// Middleware
// body parser
app.use(express.json());
app.use(express.urlencoded({extended: true})); // 내장 queryString module 사용

// Route
app.use((req, res, next) => {
  const startTime = Date.now();

  // 요청 전 로그
  logger.info(`Incoming request: ${req.method} ${req.url}`);

  // 응답 완료 후 로그
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.info(`Response sent: ${req.method} ${req.url} [Status: ${res.statusCode}] (${duration}ms)`);
  });

  next();
});

app.use('/api', apiRouter);

// 애플리케이션 종료 시 MongoDB 연결 닫기
process.on("SIGINT", async () => {
  await closeDatabaseConnection();
  process.exit(0);
});
export default app;
