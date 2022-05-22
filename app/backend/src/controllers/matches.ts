import { NextFunction, Request, Response } from 'express';
import Match from '../database/models/match';
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

  public static create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const {
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      const match = await MatchService
        .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  };

  public static finishMatch = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const data = { inProgress: false } as Match;
      await MatchService.update(data, Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  public static update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      const data = {
        ...(homeTeamGoals !== undefined && { homeTeamGoals }),
        ...(awayTeamGoals !== undefined && { awayTeamGoals }),
        ...(inProgress !== undefined && { inProgress }),
      } as Match;
      await MatchService.update(data, Number(id));
      return res.status(200).json({ message: 'Match updated' });
    } catch (error) {
      next(error);
    }
  };
}
