import { IResult, ITeamInfo } from '../interfaces';
import Results from './Results';

export default class TeamResults {
  private homeResults = new Results() ;

  private awayResults = new Results();

  constructor(private name: string) {}

  public updateHomeResult(result:IResult):void {
    this.homeResults.updateResults(result.goalsFavor, result.goalsOwn);
  }

  public updateAwayResult(result: IResult):void {
    this.awayResults.updateResults(result.goalsFavor, result.goalsOwn);
  }

  public summarizeHome(): ITeamInfo {
    const teamInfo = this.homeResults.summarize();
    return {
      name: this.name,
      ...teamInfo,
    };
  }

  public summarizeAway(): ITeamInfo {
    const teamInfo = this.awayResults.summarize();
    return {
      name: this.name,
      ...teamInfo,
    };
  }

  public summarizeResults(): ITeamInfo {
    const homeInfo = this.homeResults.summarize();
    const awayInfo = this.awayResults.summarize();
    const totalPoints = homeInfo.totalPoints + awayInfo.totalPoints;
    const totalGames = homeInfo.totalGames + awayInfo.totalGames;
    return {
      name: this.name,
      totalPoints,
      totalGames,
      totalVictories: homeInfo.totalVictories + awayInfo.totalVictories,
      totalDraws: homeInfo.totalDraws + awayInfo.totalDraws,
      totalLosses: homeInfo.totalLosses + awayInfo.totalLosses,
      goalsFavor: homeInfo.goalsFavor + awayInfo.goalsFavor,
      goalsOwn: homeInfo.goalsOwn + awayInfo.goalsOwn,
      goalsBalance: homeInfo.goalsBalance + awayInfo.goalsBalance,
      efficiency: Results.calculateEfficiency(totalPoints, totalGames),
    };
  }

  public toString(): string {
    return `result: ${this.summarizeResults()}`;
  }
}
