import { Request, Response, NextFunction } from 'express';
import { BadRequest } from '../errors';

export default class LoginMiddleware {
  static validate = (req: Request, _res: Response, next: NextFunction): void => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequest('All fields must be filled');
    }
    return next();
  };
}
