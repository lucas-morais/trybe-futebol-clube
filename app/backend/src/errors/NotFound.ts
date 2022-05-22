import RequestError from './RequestError';

export default class NotFound extends RequestError {
  constructor(message: string) {
    super(message);
    this._status = 404;
  }
}
