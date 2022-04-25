module.exports = { 
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      teamName: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'team_name'
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  }
}