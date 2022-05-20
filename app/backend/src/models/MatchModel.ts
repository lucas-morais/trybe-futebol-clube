import Match from '../database/models/match';

export default class MatchModel {
  public static async findAll() {
    const matches = await Match.findAll();
    return matches;
  }
}
