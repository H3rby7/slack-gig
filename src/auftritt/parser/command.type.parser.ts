import {EventRequestTypes} from '../request.types.enum';

export function getCommandTypeFromText(text: string): EventRequestTypes {
  if (!text) {
    console.log("No body");
    return;
  }
  return (text.toLowerCase().slice(0, text.indexOf(" "))) as EventRequestTypes;
}
