import { ICreateMatch } from '../interfaces';
import Team from '../database/models/team';
import Match from '../database/models/match';

export default class MatchModel {
  public static async findAll(): Promise<Match[] | []> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public static async findAllByStatus(status: boolean): Promise<Match[] | []> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: {
        inProgress: status,
      },
    });
    return matches;
  }

  public static async create(data: ICreateMatch): Promise<Match> {
    const match = await Match.create(data);
    return match;
  }
}
