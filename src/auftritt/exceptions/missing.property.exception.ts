import {BadSlackRequestException} from './slack.exception';

export class MissingPropertyException extends BadSlackRequestException {
  constructor(
    public property: string,
    public demoUse: string,
  ) {
    super(demoUse);
    this.message = `Sorry, we are missing data. Namely the field: ${property}.`;
  }
}
