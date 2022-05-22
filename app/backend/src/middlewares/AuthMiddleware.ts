import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors';
import { IToken } from '../interfaces';

export default class AuthMiddleware {
  constructor(private tokenJwt: IToken) {

  }

  public execute = (req: Request, _res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (authorization && authorization !== 'Basic Og==') {
      try {
        const payload = this.tokenJwt.decode(authorization);
        req.body = { ...req.body, user: payload };
        return next();
      } catch (error) {
        throw new UnauthorizedError('Invalid token');
      }
    }
    throw new UnauthorizedError('Token not found');
  };
}
