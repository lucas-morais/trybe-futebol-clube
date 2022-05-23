import Classification from '../useCases/Classification';
import MatchService from './MatchService';
import TeamService from './TeamService';

export default class LeaderboardService {
  public static async leaderbord() {
    const classification = await this.getResults();
    return classification.getLeaderboard();
  }

  public static async leaderbordHome() {
    const classification = await this.getResults();
    return classification.getLeaderboardHome();
  }

  public static async leaderbordAway() {
    const classification = await this.getResults();
    return classification.getLeaderboardAway();
  }

  private static async getResults() {
    const classification = new Classification();
    const teams = await TeamService.findAll();
    const matches = await MatchService.findAllByStatus(false);
    matches.forEach((match) => {
      const teamHome = teams[match.homeTeam - 1].teamName;
      const teamAway = teams[match.awayTeam - 1].teamName;
      classification.addResult({
        homeTeam: teamHome,
        awayTeam: teamAway,
        goalsHome: match.homeTeamGoals,
        goalsAway: match.awayTeamGoals,
      });
    });
    return classification;
  }
}
