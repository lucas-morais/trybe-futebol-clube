import { NextFunction, Request, Response } from 'express';
import { Conflict, NotFound } from '../errors';
import { TeamModel } from '../models';

export default class MatchMiddleware {
  public static validate = async (req:Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeam, awayTeam, inProgress } = req.body;
      await this.teamExistsValidation(homeTeam);
      await this.teamExistsValidation(awayTeam);
      this.sameTeamValidations(homeTeam, awayTeam);
      this.finalizedMatchValidation(inProgress);
      return next();
    } catch (error) {
      next(error);
    }
  };

  private static finalizedMatchValidation(inProgress: boolean) {
    if (!inProgress) {
      throw new Conflict('Match must be in progress');
    }
  }

  private static sameTeamValidations(homeTeam: number, awayTeam: number) {
    if (homeTeam === awayTeam) {
      throw new Conflict('It is not possible to create a match with two equal teams');
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
