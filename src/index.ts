import args from 'args';
import axios from 'axios';

args
  .option('token', 'bot token')
  .option('message', 'Your message')
  .option('subject', 'Your subject')
  .option('to', 'send to');

const {to: chat_id, message, subject, token} = args.parse(process.argv);

const text = `${subject}
${message}
`;

const url = `https://api.telegram.org/bot${token}/sendMessage`;

axios.post(url, {
  chat_id,
  text,
});
