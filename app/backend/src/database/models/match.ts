import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: number;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// Match.hasMany(Team, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Match.hasMany(Team, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Match;
