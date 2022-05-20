import { NextFunction, Request, Response } from 'express';
import { MatchService } from '../services';

export default class MatchController {
  public static findAll = async (req: Request, res: Response, next:NextFunction) => {
    try {
      const matches = await MatchService.findAll();
      return res.status(200).json(matches);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
