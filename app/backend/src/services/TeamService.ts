import Team from '../database/models/team';

export default class TeamService {
  public static async findAll():Promise<Team[] | []> {
    const teams = await TeamService.findAll();
    return teams;
  }
}
