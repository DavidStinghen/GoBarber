import User from '../models/User';

class UserController {
  // insert a new user
  async store(req, res) {
    // check if the user e-mail exists
    const userEmailExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (userEmailExists) {
      return res.status(400).json({ error: 'User e-mail alredy exists' });
    }

    // create a new user
    const { id, name, email, provider } = await User.create(req.body);
    return res.json({ id, name, email, provider });
  }

  // update user data
  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // check if the user e-mail it's diferent from provided email
    if (email !== user.email) {
      const userEmailExists = await User.findOne({ where: { email } });

      if (userEmailExists) {
        return res.status(400).json({ error: 'User e-mail alredy exists' });
      }
    }

    // check if old password is equal to old password provided
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // update data
    const { id, name, provider } = await user.update(req.body);
    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
