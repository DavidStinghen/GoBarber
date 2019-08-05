module.exports = {
  up: (queryInterface, Sequelize) => {
    // add collumn avatar_id in users table
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      // foreignKey of table files
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeCollumn('users', 'avatar_id');
  },
};
