import {BotRequest} from "../model/botRequest";

export const parseText = function(text): BotRequest {
  const parsedData = text.slice(1, text.length - 1).split('" "');
  if (!parsedData || parsedData.length !== 4) {
    return;
  }
  const result = new BotRequest();
  result.day = parsedData[0];
  result.format = parsedData[1];
  result.location = parsedData[2];
  result.time = parsedData[3];
  return result;
};
