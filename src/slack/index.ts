import {getCommandTypeFromText} from './parser/command.type.parser';
import {EventRequestTypes} from './request.types.enum';
import {SlackSlashCommandBody} from '../model/slack-slash-command-body';
import {parseCastRequest} from './parser/cast.parser';
import {BadSlackRequestException} from './exceptions/slack.exception';
import {buildCastResponseFromMetaData} from './builder/cast-request.builder';

export const processSlackSlashCommand = (req: SlackSlashCommandBody): string => {
  if (!req || !req.text) {
    console.log('no body');
    return getSampleText();
  }
  let result: string;
  try {
    const command = getCommandTypeFromText(req.text);
    result = processRequest(command, req.text);
  } catch (e) {
    if (e instanceof BadSlackRequestException) {
      return createBadSlackRequestResponse(e);
    }
  }
  if (!result) {
    return 'An unknown error occurred processing your request. Please make sure it looks somewhat like:\n\n' + getSampleText();
  }
  return result;
};

function processRequest(type: EventRequestTypes, text: string): string {
  if (type === EventRequestTypes.BESETZUNG) {
    const metaData = parseCastRequest(text.slice(type.length + 1));
    return buildCastResponseFromMetaData(metaData);
  }
  console.log('No Command matched. textDump: ' + JSON.stringify(text));
  return;
}

function createBadSlackRequestResponse(err: BadSlackRequestException): string {
  return `${err.message}\n\n Demo Usage:\n${err.demoUse}`;
}

function getSampleText() {
  return 'Bitte so nutzen: /orbo Anfrage für FORMAT am DD.MM.YYYY um HH:mm Uhr im/bei/in LOCATION';
}
