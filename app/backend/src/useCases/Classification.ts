import { IMatchHandler, IMatchResponse, ITeamInfo } from '../interfaces';
import TeamResults from './TeamResults';

export default class Classification {
  public results = new Map<string, TeamResults>();

  private static matchHandler(match: IMatchResponse): IMatchHandler {
    return {
      home: {
        goalsFavor: match.goalsHome,
        goalsOwn: match.goalsAway,
      },
      away: {
        goalsFavor: match.goalsAway,
        goalsOwn: match.goalsHome,
      },
    };
  }

  public addResult(match:IMatchResponse): void {
    const { homeTeam, awayTeam } = match;
    const matchResult = Classification.matchHandler(match);
    if (!this.results.has(homeTeam)) {
      this.results.set(homeTeam, new TeamResults(homeTeam));
    }
    if (!this.results.has(awayTeam)) {
      this.results.set(awayTeam, new TeamResults(awayTeam));
    }
    this.results.get(homeTeam)?.updateHomeResult(matchResult.home);
    this.results.get(awayTeam)?.updateAwayResult(matchResult.away);
  }

  private static sortLederboard(leaderboard: ITeamInfo[]) {
    return leaderboard.sort((teamA, teamB) => {
      const points = teamB.totalPoints - teamA.totalPoints;
      const goalsBalance = teamB.goalsBalance - teamA.goalsBalance;
      const goalsFavor = teamB.goalsFavor - teamA.goalsFavor;
      return points || goalsBalance || goalsFavor;
    });
  }

  public getLeaderboard() {
    const resultArray = Array.from(this.results.values());
    const leaderboard = resultArray.map((result) => result.summarizeResults());
    return Classification.sortLederboard(leaderboard);
  }

  public getLeaderboardHome() {
    const resultArray = Array.from(this.results.values());
    const leaderboard = resultArray.map((result) => result.summarizeHome());
    return Classification.sortLederboard(leaderboard);
  }

  public getLeaderboardAway() {
    const resultArray = Array.from(this.results.values());
    const leaderboard = resultArray.map((result) => result.summarizeAway());
    return Classification.sortLederboard(leaderboard);
  }
}
