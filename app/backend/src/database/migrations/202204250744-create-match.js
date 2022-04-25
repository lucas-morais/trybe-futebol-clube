module.exports = { 
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team',
        references: {
          model: 'teams',
          key: 'home_team'
        }
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team_goals',
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_team',
        references: {
          model: 'teams',
          key: 'away_team'
        }
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_team_goals',
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  }
}