import {EventMetadata} from '../../model/eventMetadata';
import {TokenString} from './token.string';
import {MissingPropertyException} from '../exceptions/missing.property.exception';
import {parseTextToMetadata} from './token.string.parser';

const TOKEN_STRINGS: TokenString[] = [
  {keywords: ['von'], metaProperty: 'requester'},
  {keywords: ['für'], metaProperty: 'format'},
  {keywords: ['am'], metaProperty: 'day'},
  {keywords: ['um'], metaProperty: 'time'},
  {keywords: ['im', 'in', 'bei'], metaProperty: 'location'},
];

export function parseGigRequest(textWithoutCommand: string): EventMetadata {
  const result = parseTextToMetadata(textWithoutCommand, TOKEN_STRINGS);
  TOKEN_STRINGS.forEach(e => {
    if (!result[e.metaProperty]) {
      throw new MissingPropertyException(e.metaProperty, demoCastRequest());
    }
  });
  return result;
}

export function demoCastRequest(): string {
  return 'Anfrage von REQUESTER für FORMAT am DD.MM.YYYY um hh Uhr im/bei/in LOCATION';
}
