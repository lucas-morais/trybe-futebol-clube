export default abstract class RequestError extends Error {
  protected _STATUS: number;

  constructor(message: string) {
    super(message);
    this.name = 'RequestError';
  }

  public get STATUS(): number {
    return this._STATUS;
  }
}
