export class BadSlackRequestException {
  public message: string;
  constructor(
    public demoUse: string,
  ) {}
}
