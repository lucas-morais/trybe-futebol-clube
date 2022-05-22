import { NextFunction, Request, Response } from 'express';
import { NotFound, UnauthorizedError } from '../errors';
import { TeamModel } from '../models';

export default class MatchMiddleware {
  public static validate = async (req:Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeam, awayTeam } = req.body;
      this.sameTeamValidations(homeTeam, awayTeam);
      await this.teamExistsValidation(homeTeam);
      await this.teamExistsValidation(awayTeam);
      return next();
    } catch (error) {
      next(error);
    }
  };

  private static sameTeamValidations(homeTeam: number, awayTeam: number) {
    if (homeTeam === awayTeam) {
      throw new UnauthorizedError('It is not possible to create a match with two equal teams');
    }
  }

  private static async teamExistsValidation(teamId: number) {
    try {
      await TeamModel.findById(teamId);
    } catch (error) {
      throw new NotFound('There is no team with such id!');
    }
  }
}
