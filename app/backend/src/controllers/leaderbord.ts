import { NextFunction, Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  public static leaderboard = async (
    _req: Request,
    res: Response,
    next:NextFunction,
  ): Promise<Response | void> => {
    try {
      const classification = await LeaderboardService.leaderbord();
      return res.status(200).json(classification);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public static leaderboardHome = async (
    _req: Request,
    res: Response,
    next:NextFunction,
  ): Promise<Response | void> => {
    try {
      const classification = await LeaderboardService.leaderbordHome();
      return res.status(200).json(classification);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public static leaderboardAway = async (
    _req: Request,
    res: Response,
    next:NextFunction,
  ): Promise<Response | void> => {
    try {
      const classification = await LeaderboardService.leaderbordAway();
      return res.status(200).json(classification);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
