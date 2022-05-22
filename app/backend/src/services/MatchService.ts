import { ICreateMatch } from '../interfaces';
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

  public static async create(data: ICreateMatch) {
    const match = await MatchModel.create(data);
    return match;
  }

  public static async update(data: Match, id: number): Promise<void> {
    await MatchModel.update(id, data);
  }
}
