import { NotFound } from '../errors';
import Team from '../database/models/team';

export default class TeamModel {
  public static async findAll():Promise<Team[] | []> {
    const teams = await Team.findAll();
    return teams;
  }

  public static async findById(id: number):Promise<Team> {
    const team = await Team.findByPk(id);
    if (!team) {
      throw new NotFound('Team not found');
    }
    return team;
  }
}
