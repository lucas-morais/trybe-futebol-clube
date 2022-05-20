import { MatchModel } from '../models';

export default class MatchService {
  public static async findAll() {
    const matches = MatchModel.findAll();
    return matches;
  }
}
