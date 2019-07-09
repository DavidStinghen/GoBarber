import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  /**
   * create method init
   * use (password: Sequelize.VIRTUAL) to create a vitual field
   */
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // hook to create a hash of password in password_hash before save when store
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // method to create association between file and user model
  static associate(models) {
    // collumn avatar_id belongs to file model
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }

  // method to verify if login's password is equal password in DB
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
