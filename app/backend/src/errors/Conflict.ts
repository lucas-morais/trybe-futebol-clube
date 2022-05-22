import RequestError from './RequestError';

export default class Conflict extends RequestError {
  constructor(message: string) {
    super(message);
    this._status = 409;
  }
}
