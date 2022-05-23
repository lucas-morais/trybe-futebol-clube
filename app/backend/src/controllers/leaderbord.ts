import { NextFunction, Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  constructor(private service: LeaderboardService) {}

  public leaderboard = async (
    _req: Request,
    res: Response,
    next:NextFunction,
  ): Promise<Response | void> => {
    try {
      const classification = await this.service.leaderbord();
      return res.status(200).json(classification);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public leaderboardHome = async (
    _req: Request,
    res: Response,
    next:NextFunction,
  ): Promise<Response | void> => {
    try {
      const classification = await this.service.leaderbordHome();
      return res.status(200).json(classification);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public leaderboardAway = async (
    _req: Request,
    res: Response,
    next:NextFunction,
  ): Promise<Response | void> => {
    try {
      const classification = await this.service.leaderbordAway();
      return res.status(200).json(classification);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
