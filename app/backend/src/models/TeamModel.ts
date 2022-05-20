import Team from '../database/models/team';

export default class TeamModel {
  public static async findAll():Promise<Team[] | []> {
    const teams = await Team.findAll();
    return teams;
  }
}