import RequestError from './RequestError';

export default class BadRequest extends RequestError {
  constructor(message: string) {
    super(message);
    this._status = 400;
  }
}
