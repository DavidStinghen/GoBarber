import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // load database
    this.connection = new Sequelize(dataBaseConfig);
    
    models
      // load models
      .map(model => model.init(this.connection))
      // load models association
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
