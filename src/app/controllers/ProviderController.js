import User from '../models/User';
import File from '../models/File';

class ProviderController {
  // method to list all providers
  async index(req, res) {
    const providers = await User.findAll({
      // query
      where: { provider: true },
      // attributes to show
      attributes: ['id', 'name', 'email', 'avatar_id'],
      // include avatar atributes
      include: [{
        model: File,
        as: 'avatar',
        attributes: ['name', 'path', 'url'],
      }]
    });

    return res.json(providers);
  }
}

export default new ProviderController();
