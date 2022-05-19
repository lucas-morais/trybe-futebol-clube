import RequestError from './RequestError';

export default class UnauthorizedError extends RequestError {
  constructor(message: string) {
    super(message);
    this._status = 401;
  }
}
