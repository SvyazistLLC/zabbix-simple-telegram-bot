import args from 'args';

args
  .option('message', 'Your message')
  .option('subject', 'Your subject')
  .option('to', 'send to');

const flags = args.parse(process.argv);

console.log(flags);
