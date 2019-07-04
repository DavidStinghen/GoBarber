import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  /**
   * method to store a new user
   * data validation
   * verify user email exists
   * store a new user
   */
  async store(req, res) {
    //  data for validation
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    // verify data
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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

  /**
   * method to update user data
   * data validation
   * check user email is diferent from email provided
   * check old password is equal to old password provided
   * update data
   */
  async update(req, res) {
    //  data for validation
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      // validate password if user provide old password
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      // user have to confirm the new password
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    // verify data
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
