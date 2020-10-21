import args from 'args';
import axios from 'axios';
import winston from 'winston';
import config from 'config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DailyRotateFile from 'winston-daily-rotate-file';
require('winston-daily-rotate-file');

const TOKEN = config.get('TOKEN');

const transport = new winston.transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const loger = winston.createLogger({transports: [transport]});

args
  .option('message', 'Your message')
  .option('subject', 'Your subject')
  .option('to', 'send to');

const {to: chat_id, message, subject, token} = args.parse(process.argv);

loger.info(JSON.stringify({chat_id, message, subject, token}));

const text = `${subject}
${message}
`;

const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

axios.post(url, {
  chat_id,
  text,
});
