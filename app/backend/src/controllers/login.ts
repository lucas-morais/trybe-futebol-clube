import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private service: LoginService) {

  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, email }: ILogin = req.body;
      const loginResponse = await this.service.login({ email, password });
      return res.status(200).json(loginResponse);
    } catch (e) {
      return next(e);
    }
  };
}
