import Classification from '../useCases/Classification';
import MatchService from './MatchService';
import TeamService from './TeamService';

export default class LeaderboardService {
  private classification: Classification;

  public async leaderbord() {
    await this.getResults();
    return this.classification.getLeaderboard();
  }

  public async leaderbordHome() {
    await this.getResults();
    return this.classification.getLeaderboardHome();
  }

  public async leaderbordAway() {
    await this.getResults();
    return this.classification.getLeaderboardAway();
  }

  private async getResults() {
    this.classification = new Classification();
    const teams = await TeamService.findAll();
    const matches = await MatchService.findAllByStatus(false);
    matches.forEach((match) => {
      const teamHome = teams[match.homeTeam - 1].teamName;
      const teamAway = teams[match.awayTeam - 1].teamName;
      this.classification.addResult({
        homeTeam: teamHome,
        awayTeam: teamAway,
        goalsHome: match.homeTeamGoals,
        goalsAway: match.awayTeamGoals,
      });
    });
  }
}
