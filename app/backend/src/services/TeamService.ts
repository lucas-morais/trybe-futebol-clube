import { TeamModel } from '../models';
import Team from '../database/models/team';

export default class TeamService {
  public static async findAll():Promise<Team[] | []> {
    const teams = await TeamModel.findAll();
    return teams;
  }
}
