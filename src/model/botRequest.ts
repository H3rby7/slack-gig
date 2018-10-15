export class BotRequest {
  constructor(
    public day?: string,
    public time?: string,
    public format?: string,
    public location?: string,
  ) {}
}