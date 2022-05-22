import Match from '../database/models/match';
import { MatchModel } from '../models';

export default class MatchService {
  public static async findAll(): Promise<Match[]> {
    const matches = MatchModel.findAll();
    return matches;
  }

  public static async findAllByStatus(status: boolean): Promise<Match[]> {
    const matches = MatchModel.findAllByStatus(status);
    return matches;
  }
}
