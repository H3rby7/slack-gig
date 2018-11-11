import {Callback, Context, Handler} from 'aws-lambda';
import {processSlackSlashCommand} from './slack';
import {SlackSlashCommandBody} from './model/slack-slash-command-body';

const slack: Handler<any, string> = (event: any, context: Context, callback: Callback) => {
  const slackCommand = getBodyAsSlackRequest(event.body);
  const result = processSlackSlashCommand(slackCommand);
  const response = {
    statusCode: 200,
    body: result,
    headers: {'content-type': 'text/plain'},
  };
  callback(undefined, response);
};

export {slack};

function getBodyAsSlackRequest(body: string): SlackSlashCommandBody {
  const pairs = body.split('&');

  const result = {};
  pairs.forEach(function(pair) {
    const kv = pair.split('=');
    kv[1] = kv[1].replace(/\+/g, ' ');
    result[kv[0]] = decodeURIComponent(kv[1] || '');
  });

  return JSON.parse(JSON.stringify(result)) as SlackSlashCommandBody;
}
