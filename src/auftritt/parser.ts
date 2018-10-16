import {EventMetadata} from "../model/eventMetadata";

class TokenString {
  keywords: string[];
  metaProperty: string;
}

const AVAILABLE_COMMANDS: string[] = ["Besetzung"];

const TOKEN_STRINGS: TokenString[] = [
  {keywords: ["für"], metaProperty: "format"},
  {keywords: ["am"], metaProperty: "day"},
  {keywords: ["um"], metaProperty: "time"},
  {keywords: ["im", "in", "bei"], metaProperty: "location"},
];

export const parseText = function(text): EventMetadata {
  if (!text) {
    console.log("No body");
    return;
  }
  const command = text.slice(0, text.indexOf(" "));
  if (AVAILABLE_COMMANDS.indexOf(command) < 0) {
    console.log("Not a valid command");
    return;
  }
  if (command === AVAILABLE_COMMANDS[0]) {
    return parseAsCast(text.slice(command.length + 1));
  }
  console.log("Fell through all commands. Should never be here.");
  return;
};

function parseAsCast(textWithoutCommand): EventMetadata {
  const result = new EventMetadata();
  const split = textWithoutCommand.split(" ");
  let metaProperty;
  let nextTokenIndex = 0;
  for (let i = 0; i < split.length; i++) {
    const word = split[i];
    console.log(`Word: ${word} with token: ${nextTokenIndex} and property ${metaProperty}`);
    if (TOKEN_STRINGS.length === nextTokenIndex || TOKEN_STRINGS[nextTokenIndex].keywords.indexOf(word) < 0 && metaProperty) {
      // Still filling the old token
      console.log(`Using ${word} for the current token: ${metaProperty}`);
      if (!result[metaProperty]) {
        result[metaProperty] = "";
      }
      result[metaProperty] += word + " ";
    } else {
      // token switch
      if (metaProperty && result[metaProperty]) {
        console.log(`Remove Whitespace for token: ${metaProperty}`);
        // if there, remove last whitespace
        result[metaProperty] = (<string>result[metaProperty]).slice(0, -1);
      }
      // move to next token
      metaProperty = TOKEN_STRINGS[nextTokenIndex].metaProperty;
      nextTokenIndex++;
      console.log(`Switched to next token: ${metaProperty}`);
    }
  }
  console.log(JSON.stringify(result));
  return result;
}
