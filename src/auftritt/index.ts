import {getCommandTypeFromText} from "./parser/command.type.parser";
import {buildGigResponseFromMetaData} from './builder/gig-request.builder';
import {EventRequestTypes} from './request.types.enum';
import {BotRequest} from '../model/botRequest';
import {SlackSlashCommandBody} from '../model/slack-slash-command-body';
import {parseCastRequest} from './parser/cast.parser';

export const processSlackSlashCommand = (req: SlackSlashCommandBody): string => {
  if (!req || !req.text) {
    console.log('no body');
    return getSampleText();
  }
  const command = getCommandTypeFromText(req.text);
  const result = processRequest(command, req.text);
  if (!result) {
    return getSampleText();
  }
  return buildGigResponseFromMetaData(result.metaData);
};

function processRequest(type: EventRequestTypes, text: string): BotRequest {
  if (type === EventRequestTypes.BESETZUNG) {
    return new BotRequest(EventRequestTypes.BESETZUNG, parseCastRequest(text.slice(type.length + 1)));
  }
  console.log("No Command matched. textDump: " + JSON.stringify(text));
  return;
}

function getSampleText() {
  return 'Bitte so nutzen: /orbo Anfrage für FORMAT am DD.MM.YYYY um HH:mm Uhr im/bei/in LOCATION';
}
