import { NextFunction, Request, Response } from 'express';
import { MatchService } from '../services';

export default class MatchController {
  public static findAll = async (
    req: Request,
    res: Response,
    next:NextFunction,
  ): Promise<Response | void> => {
    try {
      const { inProgress } = req.query;
      let matches;
      if (inProgress === undefined) {
        matches = await MatchService.findAll();
      } else {
        const status = inProgress === 'true';
        matches = await MatchService.findAllByStatus(status);
      }
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
}
