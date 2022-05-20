import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: DataTypes.NUMBER,
  homeTeamGoals: DataTypes.NUMBER,
  awayTeam: DataTypes.NUMBER,
  awayTeamGoals: DataTypes.NUMBER,
  inProgress: DataTypes.BOOLEAN,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// Match.hasMany(Team, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Match.hasMany(Team, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Match;
