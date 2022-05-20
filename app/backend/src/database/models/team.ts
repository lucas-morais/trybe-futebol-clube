import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './match';

class Team extends Model {
  public id: number;

  public teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: DataTypes.STRING,
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

// OtherModel.belongsTo(Team, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Team, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

Team.hasMany(Match, { foreignKey: 'id', as: 'matchs' });
Match.belongsTo(Team, { foreignKey: 'home_team', as: 'home' });
Match.belongsTo(Team, { foreignKey: 'away_team', as: 'away' });
// Team.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Team;
