import winston from 'winston';

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({level, message, timestamp}) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // 콘솔에 로그 출력
    // new winston.transports.File({ filename: "app.log" }) // 파일에 로그 저장
  ]
})