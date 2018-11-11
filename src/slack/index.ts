import {getCommandTypeFromText} from './parser/command.type.parser';
import {EventRequestTypes} from './request.types.enum';
import {SlackSlashCommandBody} from '../model/slack-slash-command-body';
import {parseCastRequest} from './parser/cast.parser';
import {BadSlackRequestException} from './exceptions/slack.exception';
import {buildCastResponseFromMetaData} from './response-builder/cast.builder';
import {parseGigRequest} from './parser/gig.parser';
import {buildGigResponseFromMetaData} from './response-builder/gig.builder';

export const processSlackSlashCommand = (req: SlackSlashCommandBody): string => {
  if (!req || !req.text) {
    console.log('no body');
    return getErrorText();
  }
  let result: string;
  try {
    const command = getCommandTypeFromText(req.text);
    console.log('Executing command: ' + command);
    result = processRequest(command, req.text);
  } catch (e) {
    if (e instanceof BadSlackRequestException) {
      return createBadSlackRequestResponse(e);
    }
  }
  if (!result) {
    return getErrorText();
  }
  return result;
};

function processRequest(type: EventRequestTypes, text: string): string {
  if (type === EventRequestTypes.BESETZUNG) {
    const metaData = parseCastRequest(text.slice(type.length + 1));
    return buildCastResponseFromMetaData(metaData);
  }
  if (type === EventRequestTypes.ANFRAGE) {
    const metaData = parseGigRequest(text.slice(type.length + 1));
    return buildGigResponseFromMetaData(metaData);
  }
  console.log('No Command matched. textDump: ' + JSON.stringify(text));
  return;
}

function createBadSlackRequestResponse(err: BadSlackRequestException): string {
  return `${err.message}\n\n Demo Usage:\n${err.demoUse}`;
}

function getErrorText() {
  return 'An unknown error occurred processing your request. Please make sure to use a supported command: [Besetzung, Anfrage]';
}
