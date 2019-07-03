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
}

export default new UserController();
