import { Request, Response, NextFunction } from 'express';
import { BadRequest } from '../errors';

export default class LoginMiddleware {
  static validate = (req: Request, _res: Response, next: NextFunction): void => {
    const { user, login } = req.body;
    if (!login || !user) {
      throw new BadRequest('All fields must be filled');
    }
    return next();
  };
}
