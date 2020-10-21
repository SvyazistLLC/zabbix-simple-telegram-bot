import axios from 'axios';
import path from 'path';
import {ArgumentParser} from 'argparse';
import winston from 'winston';
import {config as dotenvConfig} from 'dotenv';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DailyRotateFile from 'winston-daily-rotate-file';
require('winston-daily-rotate-file');

const envPath = path.join(__dirname, '..', '..', '.env');

dotenvConfig({path: envPath});
const {TOKEN} = process.env;

if (!TOKEN) {
  throw new Error('No environment variable: TOKEN');
}

const transport = new winston.transports.DailyRotateFile({
  filename: '/var/log/tgsend/tgsend-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const loger = winston.createLogger({transports: [transport]});
const parser = new ArgumentParser({
  description: 'Argparse example',
});
parser.add_argument('-m', '--message');
parser.add_argument('-s', '--subject');
parser.add_argument('-t', '--to');

const {to, message, subject} = parser.parse_args();

let chat_id = to.trim();
if (process.env[chat_id.toUpperCase()]) {
  chat_id = process.env[chat_id.toUpperCase()];
}
// process.env;
// if( process.env)

loger.info(JSON.stringify({chat_id, message, subject}));

const text = `${subject}
${message}
`;

const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
loger.info(url);

axios
  .post(url, {
    chat_id,
    text,
  })
  .then(res => {
    loger.info(res.statusText);
  })
  .catch(e => loger.error(e));
