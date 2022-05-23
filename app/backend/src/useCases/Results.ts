import { ITeamInfo } from '../interfaces';

export default class Results {
  private victories = 0;

  private draws = 0;

  private losses = 0;

  private goalsFavor = 0;

  private goalsOwn = 0;

  private totalPoints: number;

  private totalGames: number;

  public updateResults(goalsFavor: number, goalsOwn: number): void {
    this.goalsFavor += goalsFavor;
    this.goalsOwn += goalsOwn;
    const result = goalsFavor - goalsOwn;
    if (result > 0) {
      this.victories += 1;
    } else if (result < 0) {
      this.losses += 1;
    } else {
      this.draws += 1;
    }
  }

  public summarize(): ITeamInfo {
    this.sumPoints();
    this.sumGames();
    return {
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.victories,
      totalDraws: this.draws,
      totalLosses: this.losses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsFavor - this.goalsOwn,
      efficiency: Results.calculateEfficiency(this.totalPoints, this.totalGames),
    };
  }

  private sumPoints(): void {
    this.totalPoints = this.victories * 3 + this.draws;
  }

  private sumGames(): void {
    this.totalGames = this.victories + this.draws + this.losses;
  }

  public static calculateEfficiency(points: number, games: number): number {
    const efficiency = (points * 100) / (games * 3);
    return parseFloat(efficiency.toFixed(2));
  }
}
