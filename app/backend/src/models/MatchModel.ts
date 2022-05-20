import Team from '../database/models/team';
import Match from '../database/models/match';

export default class MatchModel {
  public static async findAll() {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}
