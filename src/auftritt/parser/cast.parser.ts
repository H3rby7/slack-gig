import {EventMetadata} from '../../model/eventMetadata';
import {TokenString} from './token.string';
import {MissingPropertyException} from '../exceptions/missing.property.exception';

const TOKEN_STRINGS: TokenString[] = [
  {keywords: ['für'], metaProperty: 'format'},
  {keywords: ['am'], metaProperty: 'day'},
  {keywords: ['um'], metaProperty: 'time'},
  {keywords: ['im', 'in', 'bei'], metaProperty: 'location'},
];

export function parseCastRequest(textWithoutCommand: string): EventMetadata {
  const result = parseTextToMetadata(textWithoutCommand);
  TOKEN_STRINGS.forEach(e => {
    if (!result[e.metaProperty]) {
      throw new MissingPropertyException(e.metaProperty, demoCastRequest());
    }
  });
  return result;
}

export function demoCastRequest(): string {
  return 'Besetzung für FORMAT am DD.MM.YYYY um hh Uhr im/bei/in LOCATIIN';
}

function parseTextToMetadata(textWithoutCommand: string): EventMetadata {
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
  // console.log(JSON.stringify(result));
  return result;
}
