export default abstract class RequestError extends Error {
  protected _status: number;

  constructor(message: string) {
    super(message);
    this.name = 'RequestError';
  }

  public get status(): number {
    return this._status;
  }
}
