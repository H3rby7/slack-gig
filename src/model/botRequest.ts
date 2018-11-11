import {EventMetadata} from './eventMetadata';
import {EventRequestTypes} from '../auftritt/request.types.enum';

export class BotRequest {
  constructor(
    public type?: EventRequestTypes,
    public metaData?: EventMetadata,
  ) {}
}