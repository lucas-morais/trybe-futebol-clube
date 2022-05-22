import { NextFunction, Request, Response } from 'express';
import { TeamService } from '../services';

export default class TeamController {
  public static findAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ):Promise<Response | void> => {
    try {
      const teams = await TeamService.findAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  public static findById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ):Promise<Response | void> => {
    try {
      const { id } = req.params;
      const team = await TeamService.findById(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}
