import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import dataBaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // sequelize connection for Postgres
  init() {
    // load database
    this.connection = new Sequelize(dataBaseConfig);

    models
      // load models
      .map(model => model.init(this.connection))
      // load models association
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // mongoose connection for MongoDB
  mongo() {
    // load database
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      { useNewUrlParser: true, useFindAndModify: true },
    );
  }

}

export default new Database();
