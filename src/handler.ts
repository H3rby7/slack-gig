import {Callback, Context, Handler} from 'aws-lambda';
import {processSlackSlashCommand} from './slack';

const slack: Handler = (event: any, context: Context, callback: Callback) => {
  callback(undefined, processSlackSlashCommand(event));
};

export {slack};
