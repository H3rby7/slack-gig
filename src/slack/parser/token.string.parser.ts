import {EventMetadata} from '../../model/eventMetadata';
import {TokenString} from './token.string';

export function parseTextToMetadata(textWithoutCommand: string, TOKEN_STRINGS: TokenString[]): EventMetadata {
  const result = new EventMetadata();
  const split = textWithoutCommand.split(' ');
  let metaProperty;
  let nextTokenIndex = 0;
  for (let i = 0; i < split.length; i++) {
    const word = split[i];
    // console.log(`Word: ${word} with token: ${nextTokenIndex} and property ${metaProperty}`);
    if (TOKEN_STRINGS.length === nextTokenIndex || TOKEN_STRINGS[nextTokenIndex].keywords.indexOf(word) < 0 && metaProperty) {
      // Still filling the old token
      // console.log(`Using ${word} for the current token: ${metaProperty}`);
      if (!result[metaProperty]) {
        result[metaProperty] = '';
      }
      result[metaProperty] += word + ' ';
    } else {
      // token switch
      if (metaProperty && result[metaProperty]) {
        // console.log(`Remove Whitespace for token: ${metaProperty}`);
        // if present, remove last whitespace
        result[metaProperty] = (<string>result[metaProperty]).slice(0, -1);
      }
      // move to next token
      metaProperty = TOKEN_STRINGS[nextTokenIndex].metaProperty;
      nextTokenIndex++;
      // console.log(`Switched to next token: ${metaProperty}`);
    }
  }
  if (metaProperty && result[metaProperty]) {
    // console.log(`Remove Whitespace for token: ${metaProperty}`);
    // if present, remove last whitespace
    result[metaProperty] = (<string>result[metaProperty]).slice(0, -1);
  }
  // console.log(JSON.stringify(result));
  return result;
}
